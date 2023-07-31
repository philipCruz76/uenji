import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { LoginValidator } from "@/types/login.types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = LoginValidator.parse(body);

    if (!email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error), "REGISTRATION_ERROR";
    return new NextResponse("Internal server error", { status: 500 });
  }
}
