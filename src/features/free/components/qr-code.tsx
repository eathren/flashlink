import { QRCodeSVG } from "qrcode.react"
import useCardStore from "@/features/free/stores/use-free-store"

const QRCodeComponent = () => {
  const { formData } = useCardStore()
  const qrData = JSON.stringify(formData)

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-lg font-bold">QR Code</h2>
      <QRCodeSVG value={qrData} size={256} />
    </div>
  )
}

export default QRCodeComponent
