import React, { useState } from "react";

export default function App() {
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

      const response = await fetch(
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

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setStatus(`Upload successful: ${file.name}`);
    } catch (error) {
      console.error(error);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        <h1>Violet Lesson Upload</h1>

        <p style={{ color: "#aaa" }}>
          Upload full lesson recordings here for large files that Telegram
          cannot handle.
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />

        <button
          onClick={handleUpload}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload Lesson
        </button>

        {status && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              border: "1px solid #333",
              borderRadius: "10px",
            }}
          >
            {status}
          </div>
        )}

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#888",
          }}
        >
          After upload, Violet will process your lesson and return your
          transcript + study summary in Telegram.
        </p>
      </div>
    </div>
  );
}
