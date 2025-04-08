import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, saveUserToDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const existing: any = await getUserByEmail(email);
    if (existing)
      return NextResponse.json(
        { error: "Email already used" },
        { status: 400 }
      );

    const hashed = await bcrypt.hash(password, 10);
    await saveUserToDB({
      name,
      email,
      password: hashed,
      provider: "credentials",
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 }
    );
  }
}
