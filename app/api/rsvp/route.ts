import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "rsvp.json");

export interface RSVPEntry {
  id: string;
  name: string;
  status: "hadir" | "tidak_hadir";
  message: string;
  createdAt: string;
}

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

function readData(): RSVPEntry[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as RSVPEntry[];
}

function writeData(data: RSVPEntry[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET — ambil semua ucapan
export async function GET() {
  try {
    const data = readData();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal membaca data" },
      { status: 500 }
    );
  }
}

// POST — simpan ucapan baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, status, message } = body as {
      name: string;
      status: "hadir" | "tidak_hadir";
      message: string;
    };

    if (!name || !status) {
      return NextResponse.json(
        { success: false, error: "Nama dan status wajib diisi" },
        { status: 400 }
      );
    }

    const entry: RSVPEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim(),
      status,
      message: message?.trim() ?? "",
      createdAt: new Date().toISOString(),
    };

    const data = readData();
    data.unshift(entry); // terbaru di atas
    writeData(data);

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
