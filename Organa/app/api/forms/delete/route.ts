import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { formId } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/forms.json");

  // Load existing forms
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Filter out the form
  const updated = existing.filter((f: any) => f.id !== formId);

  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return NextResponse.json({ success: true });
}