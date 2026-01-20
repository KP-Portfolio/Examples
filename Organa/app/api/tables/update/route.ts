import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { formId, updatedRow } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/tables.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!existing[formId]) {
    return NextResponse.json({ success: false, error: "Form not found" });
  }

  existing[formId] = existing[formId].map((row: any) =>
    row.id === updatedRow.id ? updatedRow : row
  );

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true });
}