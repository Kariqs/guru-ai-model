import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionAssistantMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionAssistantMessageParam = {
  role: "assistant",
  content:
    "You are a code generator. Your answers should only be in markdown code snippets. Give explanations as code comments.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorised Access!", { status: 401 });
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const fullMessages = [instructionMessage, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Replace with your OpenAI model
      messages: fullMessages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return new NextResponse(JSON.stringify(response.choices[0].message), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("CODE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
