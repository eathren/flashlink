import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import { useRef } from "react"
import useCardStore, { Layout } from "@/features/free/stores/use-free-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"

const PreviewCard = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { formData, color, vcfChecked, layout } = useCardStore()

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        backgroundColor: "#FFFFFF",
        height: 600,
        width: 350,
      }).then((canvas) => {
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = "business-card.png"
        link.click()
      })
    }
  }

  const layoutClasses: Record<Layout, string> = {
    [Layout.left]: "items-start text-left",
    [Layout.center]: "items-center text-center",
    [Layout.right]: "items-end text-right",
  }

  return (
    <>
      <div
        ref={cardRef}
        className="w-full   max-w-[350px]  rounded-none overflow-hidden mx-auto"
      >
        <Card
          className="h-full  w-full  border-2 bg-white rounded-none  shadow-none  "
          style={{
            minHeight: "600px",
            height: "600px",
            width: "350px",
            backgroundColor: color,
          }}
        >
          <CardHeader className="p-4   ">
            <CardTitle className="text-2xl font-semibold">
              {formData.name}
            </CardTitle>
            <p className="text-lg ">{formData.title}</p>
          </CardHeader>
          <CardContent className="p-4">
            <div className={`flex flex-col ${layoutClasses[layout]} space-y-2`}>
              <p>{formData.email}</p>
              <p>{formData.address}</p>
              <p>{formData.phone}</p>
              {formData.linkedin && <p>{formData.linkedin}</p>}
              {formData.discord && <p>{formData.discord}</p>}
              {formData.website && <p>{formData.website}</p>}
              <p className="mt-4 text-gray-700">{formData.bio}</p>
              {vcfChecked && formData.vcf && (
                <div className="pt-4 flex text-center  mx-auto">
                  <QRCodeSVG bgColor={color} value={formData.vcf} size={160} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Button
        onClick={downloadCard}
        className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Download PNG
      </Button>
    </>
  )
}

export default PreviewCard
