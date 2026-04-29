import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VioletUploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please choose a lesson recording first.");
      return;
    }

    try {
      setStatus("Uploading lesson...");

      const SUPABASE_URL = "https://kxmoizusjgblpznkudhx.supabase.co";
      const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bW9penVzamdibHB6bmt1ZGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjY4NTMsImV4cCI6MjA5MzA0Mjg1M30._1V9wLQcLCaMYR_38NCnh9fJRG0-E2KfRrRGe1O6OgE";
      const BUCKET_NAME = "lesson-uploads";

      const filePath = `${Date.now()}-${file.name}`;

      const uploadResponse = await fetch(
        `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${filePath}`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": file.type || "audio/mpeg",
            "x-upsert": "false",
          },
          body: file,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      setStatus(`Upload successful: ${file.name}`);
    } catch (error) {
      console.error(error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl rounded-2xl shadow-xl border border-zinc-800 bg-zinc-950">
        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Violet Lesson Upload</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Upload full lesson recordings here for large files that Telegram
              cannot handle.
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />

            <Button
              onClick={handleUpload}
              className="w-full rounded-xl"
            >
              Upload Lesson
            </Button>
          </div>

          {status && (
            <div className="text-sm text-zinc-300 border border-zinc-800 rounded-xl p-3">
              {status}
            </div>
          )}

          <p className="text-xs text-zinc-500">
            After upload, Violet will process your lesson and return your
            transcript + study summary in Telegram.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
