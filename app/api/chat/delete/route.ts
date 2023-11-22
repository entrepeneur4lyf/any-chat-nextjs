import { adminDb } from "@/firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { chatId } = await req.json();

  const ref = adminDb.collection("chats").doc(chatId);
  const bulkWrite = adminDb.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;

  bulkWrite.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.log(`Failed to delete chat ${chatId}`, error.documentRef.path);
      return false;
    }
  });

  try {
    await adminDb.recursiveDelete(ref, bulkWrite);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(`Failed to delete chat ${chatId}`, error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
