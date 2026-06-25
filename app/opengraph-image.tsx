import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chitraksh Singh — ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0f172a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid dot pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          display: "flex",
        }} />

        {/* top cyan glow */}
        <div style={{
          position: "absolute", top: -120, left: "50%",
          transform: "translateX(-50%)",
          width: 800, height: 300,
          background: "radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* monogram badge */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 72, height: 72, borderRadius: 16,
          background: "rgba(6,182,212,0.12)",
          border: "1.5px solid rgba(6,182,212,0.35)",
          marginBottom: 36,
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#06b6d4", fontFamily: "sans-serif" }}>CS</span>
        </div>

        {/* name */}
        <div style={{
          fontSize: 72, fontWeight: 800, color: "#f1f5f9",
          fontFamily: "sans-serif", lineHeight: 1.1, marginBottom: 20,
          letterSpacing: "-2px",
        }}>
          Chitraksh Singh
        </div>

        {/* title */}
        <div style={{
          fontSize: 28, fontWeight: 500, color: "#06b6d4",
          fontFamily: "sans-serif", marginBottom: 28,
          letterSpacing: "0.5px",
        }}>
          Machine Learning Engineer
        </div>

        {/* tags */}
        <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
          {["Agentic AI", "Cybersecurity ML", "Quant Finance"].map(tag => (
            <div key={tag} style={{
              padding: "6px 18px", borderRadius: 999,
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
              color: "#67e8f9", fontSize: 16, fontFamily: "sans-serif",
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* bottom meta */}
        <div style={{
          position: "absolute", bottom: 60, left: 80, right: 80,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ color: "#475569", fontSize: 16, fontFamily: "monospace" }}>
            chitrakshsingh007@gmail.com
          </div>
          <div style={{
            color: "#06b6d4", fontSize: 16, fontFamily: "monospace",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#06b6d4",
            }} />
            Open to Opportunities
          </div>
        </div>

        {/* right accent line */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: 4,
          background: "linear-gradient(to bottom, transparent, #06b6d4, transparent)",
        }} />
      </div>
    ),
    { ...size }
  );
}
