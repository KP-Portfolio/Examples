import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const updatedUser = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/users.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const updated = existing.map((u: any) =>
    u.id === updatedUser.id ? updatedUser : u
  );

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return NextResponse.json({ success: true });
}