import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {prompt} = reqBody;

        const res = await openai.images.generate({
            prompt: prompt,
            n:1,
            size:"512x512"
        })

        console.log(res);
        return NextResponse.json(res.data)
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}