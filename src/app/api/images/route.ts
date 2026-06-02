import {
    S3Client,
    ListObjectsV2Command,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_S3_BUCKET!;
const PREFIX = "images/";

export async function GET() {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: PREFIX,
        });
        const response = await s3.send(command);

        const items = (response.Contents ?? [])
            .filter((obj) => obj.Key && obj.Key !== PREFIX)
            .map((obj) => ({
                key: obj.Key!,
                url: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${obj.Key}`,
                size: obj.Size ?? 0,
                lastModified: obj.LastModified?.toISOString() ?? null,
            }));

        return NextResponse.json({ images: items });
    } catch (err) {
        console.error("S3 list error:", err);
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const key =
        typeof body === "object" &&
        body !== null &&
        typeof (body as Record<string, unknown>).key === "string"
            ? (body as { key: string }).key
            : null;

    if (!key) {
        return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    // Guard: only allow deleting from the images/ prefix
    if (!key.startsWith(PREFIX)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("S3 delete error:", err);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}
