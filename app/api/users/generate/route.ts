import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/apiLimit";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(request: NextRequest) {
    
    try {
        const {userId} = auth();
        const reqBody = await request.json();
        const {prompt, amount=1, resolution="256x256"} = reqBody;

        if (!userId) {
            return new NextResponse("Unauthorized user", {status: 401});
        }
        
        if (!openai.apiKey) {
            return new NextResponse("OpenAi API key not configured", {status: 500});
        }

        if (!prompt) {
            return new NextResponse("Provide a prompt", {status: 400})
        }

        if (!amount) {
            return new NextResponse("Provide an amount", { status: 400 })
        }

        if (!resolution) {
            return new NextResponse("Provide a resolution", { status: 400 })
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", {status: 403})
        }

        const res = await openai.images.generate({
            prompt: prompt,
            n: parseInt(amount, 10), // Convert amount to an integer, default to 1 if not provided
            size: resolution,
        })

        await increaseApiLimit();

        // console.log(res);
        return NextResponse.json(res.data)
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}