import { createFileRoute } from "@tanstack/react-router"
import QrCode from "@/features/free/components/qr-code"

export const Route = createFileRoute("/create-free/qr-code")({
  component: QrCode,
})
