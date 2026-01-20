import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { id } = await req.json();

  const filePath = path.join(process.cwd(), "public/json/users.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updated = existing.filter((u: any) => u.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return NextResponse.json({ success: true });
}