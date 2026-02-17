import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "POS ME - ระบบจัดการร้านค้าครบวงจร",
    short_name: "POS ME",
    description:
      "ระบบจัดการร้านค้าครบวงจร แอปสมาชิกสะสมแต้ม ระบบขายหน้าร้าน POS และ Backoffice Dashboard",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
