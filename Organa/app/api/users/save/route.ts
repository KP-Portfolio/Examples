import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { rows } = await req.json();

  const filePath = path.join(process.cwd(), "public/JSON/users.json");

  // Load existing users
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Start with the numeric portion
  let nextIdNum = existing.length + 1;

  // Attach IDs to incoming rows
  const rowsWithIds = rows.map((row: any) => ({
    id: "u" + nextIdNum++,
    ...row,
  }));
  
  // Merge into existing
  const updated = [...existing, ...rowsWithIds];

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  return NextResponse.json({ success: true });
}