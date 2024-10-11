import useCardStore, { Layout } from "@/features/free/stores/use-free-store"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import PreviewDialog from "@/features/free/components/preview-dialog"
import { useState } from "react"

function CreateFreeCard() {
  const { formData, setFormData, setLayout } = useCardStore()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const onOpenChange = () => {
    setDialogOpen((prev) => !prev)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form className="w-full max-w-xs m-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle hidden={true}>Create Your Card</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address ?? ""}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company ?? ""}
            onChange={handleChange}
          />
          <Textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <Select onValueChange={(value) => setLayout(value as Layout)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Layout" />
            </SelectTrigger>
            <SelectContent defaultValue={Layout.left}>
              <SelectItem value={Layout.left}>Left</SelectItem>
              <SelectItem value={Layout.center}>Center</SelectItem>
              <SelectItem value={Layout.right}>Right</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <PreviewDialog isOpen={isDialogOpen} onOpenChange={onOpenChange} />
      <Button className="mt-4 w-full"> Create Card </Button>
    </form>
  )
}

export default CreateFreeCard
