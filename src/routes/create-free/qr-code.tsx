import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/create-free/qr-code")({
  component: QrCode,
})

function QrCode() {
  return (
    <div>
      <h1>QrCode</h1>
    </div>
  )
}
