import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

import { env } from "@/pdf.config";
import { noteService } from "@/services";
import { INote } from "@/types";

export async function POST(req: NextRequest) {
  const query = (await req.json()) as INote;

  const browser = await puppeteer.connect({
    browserWSEndpoint: env.BROWSER_ENDPOINT,
  });

  try {
    const noteId = await noteService.create(query);

    const targetUrl = new URL(`/notes/${noteId}`, env.REPORTS_ENDPOINT);
    const fileName = `note-${noteId}.pdf`;

    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.setViewport({ width: 595, height: 842 });
    await page.evaluate(() => document.fonts.ready);

    await page.goto(targetUrl.toString(), {
      waitUntil: ["domcontentloaded", "load", "networkidle0"],
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new Response(pdfBuffer as unknown as ArrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return new Response(`Error generating PDF: ${error}`, { status: 500 });
  } finally {
    await browser?.close();
  }
}
