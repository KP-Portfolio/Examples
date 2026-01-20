import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { formId } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/tables.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  delete existing[formId];

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true });
}