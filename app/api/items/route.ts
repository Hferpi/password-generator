import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      typeElement,
      isFavourite,
      urlWebsite,
      username,
      password,
      notes,
      directory,
      userId,
    } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

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
        userId,
      },
    });

    return NextResponse.json(element);
  } catch (error) {
    console.error("[POST /api/items]", error);
    return NextResponse.json(
      { error: "Error al crear el elemento" },
      { status: 500 }
    );
  }
}
