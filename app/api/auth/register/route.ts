import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json()
        
        if (!email || !password) {
            return NextResponse.json("Missing credentials", { status: 400 })
        }
        
        const hashedPassword = await hash(password, 10)
        const user = await db.user.create({
            data: {
                email,
                hashedPassword,
                username,
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}