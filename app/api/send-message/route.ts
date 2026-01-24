import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, attendance, message } = await req.json();

  if (!name || !message) {
    return NextResponse.json(
      { message: "Data tidak lengkap" },
      { status: 400 },
    );
  }

  const text =
    `TASYAKUR KHITANAN BABANG ADHITAMA & TASYAKUR HARI ULANG TAHUN OWNER (H. ACENG SUNANTO)
    \nNama: ${name}
    \nKehadiran: ${attendance}
    \nPesan:
    \n${message}
  `.trim();

  const forms = new FormData();
  forms.append("messageText", text);

  const res = await fetch(
    `https://live-mt-server.wati.io/1074072/api/v1/sendSessionMessage/${process.env.PHONE!}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WATI_TOKEN!}`,
      },
      body: forms,
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: "Gagal kirim ke WhatsApp" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
