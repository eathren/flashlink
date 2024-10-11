// src/features/free/components/Links.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input-w-label"
import useCardStore from "@/features/free/stores/use-free-store"

const Links = () => {
  const { formData, setFormData } = useCardStore()
  const [link, setLink] = useState("")

  const handleAddLink = () => {
    if (link) {
      setFormData({
        ...formData,
        links: [...(formData.links || []), link],
      })
      setLink("")
    }
  }

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-lg font-bold">Links</h2>
      <InputWithLabel
        type="text"
        name="Link"
        placeholder="Add a link"
        label="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button onClick={handleAddLink} className="mt-2">
        Add Link
      </Button>
      <ul className="mt-4 space-y-2">
        {formData.links?.map((link: string, index: number) => (
          <li key={index} className="text-sm">
            {link}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Links
