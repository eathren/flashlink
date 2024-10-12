import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import { useRef } from "react"
import useCardStore from "@/features/free/stores/use-free-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"

const PreviewCard = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { formData, color, vcfChecked } = useCardStore()

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        backgroundColor: "#FFFFFF",
        height: cardRef.current.offsetHeight,
        width: cardRef.current.offsetWidth,
      }).then((canvas) => {
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = "business-card.png"
        link.click()
      })
    }
  }

  return (
    <>
      <div className="p-0 m-0 border-2 border-gray-300 rounded-lg">
        <div
          ref={cardRef}
          className="w-full max-w-[400px] max-h-[200px] overflow-hidden mx-auto"
        >
          <Card
            className="h-full border-none w-full bg-white shadow-none flex"
            style={{
              backgroundColor: color,
            }}
          >
            <div className="flex-1 p-6">
              <CardHeader className="p-0 flex flex-col">
                <CardTitle className="text-xl sm:text-2xl font-semibold">
                  {formData.name}
                </CardTitle>
                <p className="text-lg">{formData.title}</p>
              </CardHeader>
              <CardContent className="flex flex-col p-0 space-y-1">
                <p className="text-sm">{formData.email}</p>
                <p className="text-sm">{formData.phone}</p>
                <p className="text-sm">{formData.address}</p>
                {formData?.links?.linkedin && (
                  <p className="text-sm">{formData?.links?.linkedin}</p>
                )}
                {formData?.links?.discord && (
                  <p className="text-sm">{formData?.links?.discord}</p>
                )}
                {formData?.links?.website && (
                  <p className="text-sm">{formData?.links?.website}</p>
                )}
                <p className="mt-2 text-gray-700 text-sm">{formData.bio}</p>
              </CardContent>
            </div>
            {vcfChecked && formData.vcf && (
              <div className="flex justify-center items-center p-4">
                <QRCodeSVG bgColor={color} value={formData.vcf} size={70} />
              </div>
            )}
          </Card>
        </div>
      </div>
      <div className="mt-2">
        <Button
          onClick={downloadCard}
          className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Download PNG
        </Button>
      </div>
    </>
  )
}

export default PreviewCard
