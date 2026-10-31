import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, confirmPassword } = await req.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Kata sandi tidak cocok" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Kata sandi minimal 8 karakter" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, passwordHash, role: "PASIEN" },
    });

    return NextResponse.json({ message: "Akun berhasil dibuat", userId: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}