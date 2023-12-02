import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();
        const {prompt, amount=1, resolution="256x256"} = reqBody;

        const res = await openai.images.generate({
            prompt: prompt,
            n: parseInt(amount, 10), // Convert amount to an integer, default to 1 if not provided
            size: resolution,
        })

        console.log(res);
        return NextResponse.json(res.data)
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}