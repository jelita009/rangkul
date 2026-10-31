import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: "Tidak ada sesi aktif" }, { status: 401 });
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);

    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) {
      return NextResponse.json({ error: "Sesi kedaluwarsa, silakan login kembali" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 401 });
    }

    const newAccessToken = await signAccessToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({ message: "Token diperbarui" });
    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Sesi tidak valid" }, { status: 401 });
  }
}