import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { form } = await req.json();

  // form = { name: string, fields: [...] }

  // Paths
  const formsPath = path.join(process.cwd(), "public/JSON/forms.json");
  const tablesPath = path.join(process.cwd(), "public/JSON/tables.json");

  // Load existing data
  const existingForms = JSON.parse(fs.readFileSync(formsPath, "utf8"));
  const existingTables = JSON.parse(fs.readFileSync(tablesPath, "utf8"));

  // Create ID from name (lowercase, no spaces)
  const id = form.name.toLowerCase().replace(/\s+/g, "");

  // Build new form schema
  const newForm = {
    id,
    name: form.name,
    fields: form.fields
  };

  // Add to forms.json
  const updatedForms = [...existingForms, newForm];
  fs.writeFileSync(formsPath, JSON.stringify(updatedForms, null, 2));

  // Initialize empty table in tables.json
  if (!existingTables[id]) {
    existingTables[id] = [];
    fs.writeFileSync(tablesPath, JSON.stringify(existingTables, null, 2));
  }

  return NextResponse.json({ success: true, form: newForm });
}