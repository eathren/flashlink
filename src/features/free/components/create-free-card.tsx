import useCardStore, { Layout } from "@/features/free/stores/use-free-store"
import { InputWithLabel } from "@/components/ui/input-w-label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function CreateFreeCard() {
  const { formData, setFormData, setLayout } = useCardStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
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
          <InputWithLabel
            type="text"
            name="linkedin"
            placeholder="/in/name"
            label="LinkedIn"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <InputWithLabel
            type="text"
            name="discord"
            placeholder="Discord"
            label="Discord"
            value={formData.discord}
            onChange={handleChange}
          />
          <InputWithLabel
            type="text"
            name="website"
            placeholder="Website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
          />
          <InputWithLabel
            type="text"
            name="address"
            placeholder="Address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputWithLabel
            type="text"
            name="company"
            placeholder="Company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
          />
          <label className="text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
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
  )
}

export default CreateFreeCard
