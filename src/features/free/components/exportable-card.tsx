import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import { useRef } from "react"
import useCardStore, { Layout } from "@/features/free/stores/use-free-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ExportableCard = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const { formData, layout } = useCardStore()

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        backgroundColor: "#FFFFFF",
        height: 600,
        width: 320,
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
      <div ref={cardRef} className="w-full bg-white max-w-xs ">
        <Card
          className="h-full w-full bg-white rounded-md shadow-none"
          style={{ minHeight: "600px" }}
        >
          <CardHeader>
            <CardTitle>{formData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex flex-col ${layoutClasses[layout]}`}>
              <div className="flex items-center mb-2">
                <p>{formData.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <p>{formData.phone}</p>
              </div>
              <div className="flex items-center mb-2">
                <p>{formData.linkedin}</p>
              </div>
              <div className="flex items-center mb-2">
                <p>{formData.discord}</p>
              </div>
              <div className="flex items-center mb-2">
                <p>{formData.website}</p>
              </div>
              <p className="mt-4">{formData.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button onClick={downloadCard} className="w-full mt-4">
        Download Card
      </Button>
    </>
  )
}

export default ExportableCard
