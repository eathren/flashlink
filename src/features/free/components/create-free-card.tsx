import useCardStore, {
  FormData,
  Layout,
} from "@/features/free/stores/use-free-store"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import vCard from "vcf"
import { Textarea } from "@/components/ui/textarea"
import PreviewDialog from "@/features/free/components/preview-dialog"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function CreateFreeCard() {
  const { formData, setFormData, setLayout, setVcfChecked, vcfChecked } =
    useCardStore()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const onOpenChange = () => {
    setDialogOpen((prev) => !prev)
    if (!isDialogOpen) {
      const vcfData = generateVcf(formData)
      setFormData({ ...formData, vcf: vcfData })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange()
  }

  const generateVcf = (formData: FormData) => {
    const card = new vCard()

    if (formData.name) {
      card.set("fn", formData.name)
    }

    if (formData.company) {
      card.set("org", formData.company)
    }

    if (formData.email) {
      card.set("email", formData.email)
    }

    if (formData.phone) {
      card.set("tel", formData.phone)
    }

    if (formData.address) {
      card.set("adr", formData.address)
    }

    const contact = card.toString("4.0")
    console.log("Generated VCF:", contact)
    return contact
  }
  return (
    <form className="w-full max-w-xs m-auto mt-10" onSubmit={handleCreateCard}>
      <h1 className="text-2xl font-semibold text-center mb-4">
        Create Your Card
      </h1>
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

          <span className="space-x-2">
            <Checkbox
              checked={vcfChecked}
              onCheckedChange={(checked) => setVcfChecked(!!checked as boolean)}
            ></Checkbox>
            <Label htmlFor="vcf">Create Code for Scannable Contact</Label>
          </span>
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
      <div className="my-4">
        <PreviewDialog isOpen={isDialogOpen} onOpenChange={onOpenChange} />
      </div>
    </form>
  )
}

export default CreateFreeCard
