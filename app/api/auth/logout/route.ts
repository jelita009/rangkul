import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  const response = NextResponse.json({ message: "Logout berhasil" });
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}