import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "JannMat — The real-time pulse of Indian democracy.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            maxWidth: 900,
            padding: 48,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.02em" }}>
            JannMat
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#94a3b8",
              textAlign: "center",
              lineHeight: 1.35,
            }}
          >
            The real-time pulse of Indian democracy.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
