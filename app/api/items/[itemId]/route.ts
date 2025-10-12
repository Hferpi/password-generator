import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await context.params;  
    const values = await request.json();

    if (!itemId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const element = await db.element.update({
      where: { id: itemId },
      data: { ...values },
    });

    return NextResponse.json(element);
  } catch (error) {
    console.error("[PATCH /api/items/[itemId]]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
