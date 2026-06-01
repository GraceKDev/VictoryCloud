import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_S3_BUCKET!;

export async function POST(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (
        typeof body !== "object" ||
        body === null ||
        typeof (body as Record<string, unknown>).filename !== "string" ||
        typeof (body as Record<string, unknown>).contentType !== "string"
    ) {
        return NextResponse.json({ error: "filename and contentType are required" }, { status: 400 });
    }

    const { filename, contentType } = body as { filename: string; contentType: string };

    // Sanitise the filename — strip path traversal and special chars
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `comics/${Date.now()}_${safeName}`;

    try {
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,

        });

        const url = await getSignedUrl(s3, command, { expiresIn: 300 });
        const objectUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        return NextResponse.json({ url, objectUrl });
    } catch (err) {
        console.error("S3 presign error:", err);
        return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}
