import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { formId, rowId } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/tables.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!existing[formId]) {
    return NextResponse.json({ success: false, error: "Form not found" });
  }

  existing[formId] = existing[formId].filter((row: any) => row.id !== rowId);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true });
}