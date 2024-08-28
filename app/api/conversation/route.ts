import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Replace with your OpenAI model
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return new NextResponse(JSON.stringify(response.choices[0].message), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("CONVERSATION ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
