import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import {
  cloneSeedPeople,
  cloneSeedRelationships,
} from "@/data/sample";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "tree.json");

type TreePayload = {
  people: Record<string, unknown>;
  relationships: unknown[];
  audit?: unknown[];
};

function seedPayload(): TreePayload {
  return {
    people: cloneSeedPeople(),
    relationships: cloneSeedRelationships(),
    audit: [],
  };
}

async function ensureFile(): Promise<TreePayload> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as TreePayload;
    if (parsed?.people && Array.isArray(parsed.relationships)) {
      return {
        people: parsed.people,
        relationships: parsed.relationships,
        audit: Array.isArray(parsed.audit) ? parsed.audit : [],
      };
    }
  } catch {
    /* missing or corrupt — write seed */
  }
  const seed = seedPayload();
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf8");
  return seed;
}

export async function GET() {
  const data = await ensureFile();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  let body: TreePayload;
  try {
    body = (await request.json()) as TreePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body?.people || !Array.isArray(body.relationships)) {
    return NextResponse.json(
      { error: "people and relationships required" },
      { status: 400 }
    );
  }
  const payload: TreePayload = {
    people: body.people,
    relationships: body.relationships,
    audit: Array.isArray(body.audit) ? body.audit : [],
  };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
