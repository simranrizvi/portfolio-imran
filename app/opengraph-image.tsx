import { ImageResponse } from "next/og";
import { getPersonalInfo } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const info = getPersonalInfo();
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0b0b0f",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 28, color: "#a78bfa", marginBottom: 24 }}>
        PORTFOLIO
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
        {info.name}
      </div>
      <div style={{ fontSize: 38, marginTop: 28, color: "#d1d5db" }}>
        {`${info.title} · ${info.location}`}
      </div>
    </div>,
    size,
  );
}
