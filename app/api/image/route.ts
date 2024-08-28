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
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorised Access!", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required required", {
        status: 400,
      });
    }

    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("IMAGE_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
