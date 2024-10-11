import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import html2canvas from "html2canvas"
import { useRef } from "react"
import {
  IconMail,
  IconPhone,
  IconBrandLinkedin,
  IconBrandDiscord,
  IconDeviceDesktop,
} from "@tabler/icons-react"
import useCardStore, { Layout } from "@/features/free/stores/use-free-store"
import { InputWithLabel } from "@/components/ui/input-w-label"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function CreateFreeCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { formData, setFormData, layout, setLayout } = useCardStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form className="w-full max-w-xs">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Card</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <InputWithLabel
                type="text"
                name="name"
                placeholder="Your Name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputWithLabel
                type="email"
                name="email"
                placeholder="Email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputWithLabel
                type="tel"
                name="phone"
                placeholder="Phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {/* Additional Input Fields */}
              <Select onValueChange={(value) => setLayout(value as Layout)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Layout.left}>Left</SelectItem>
                  <SelectItem value={Layout.center}>Center</SelectItem>
                  <SelectItem value={Layout.right}>Right</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </form>

        <div>
          <div ref={cardRef} className="w-full bg-white max-w-xs">
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
                    <IconMail className="mr-2 text-gray-600" />
                    <p>{formData.email}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <IconPhone className="mr-2 text-gray-600" />
                    <p>{formData.phone}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <IconBrandLinkedin className="mr-2 text-gray-600" />
                    <p>{formData.linkedin}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter />
            </Card>
          </div>
          <Button onClick={downloadCard} className="w-full mt-4">
            Download Card
          </Button>
        </div>
      </div>

      <Link to="/sign-up">
        <Button className="mt-2">Sign Up for an Account</Button>
      </Link>
    </div>
  )
}

export default CreateFreeCard
