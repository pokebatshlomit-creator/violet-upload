import React, { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please choose a lesson recording first.");
      return;
    }

    // Placeholder for real Supabase upload integration
    setStatus(`Upload ready for: ${file.name}`);
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
