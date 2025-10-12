import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
const {
    name,
    typeElement,
    isFavourite,
    urlWebsite,
    username,
    password,
    notes,
    directory,
    userId
} =await req.json()
const element = await db.element.create({
    data: {
        name,
        typeElement,
        isFavourite,
        urlWebsite,
        username,
        password,
        notes,
        directory,
        userId
    }
})
return NextResponse.json(element)

    }catch(error){
        console.log(error)
        return NextResponse.json({error: "Error al crear el elemento"}, {status: 500})
    }
}