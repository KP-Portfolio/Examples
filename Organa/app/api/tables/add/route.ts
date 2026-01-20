import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { formId, row } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/tables.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!existing[formId]) {
    existing[formId] = [];
  }

  const nextId = existing[formId].length + 1;

  const rowWithId = {
    id: nextId,
    ...row
  };

  existing[formId].push(rowWithId);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true, row: rowWithId });
}