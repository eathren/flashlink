import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import useCardStore from '@/features/free/stores/use-free-store'

type LinksDialogProps = {
  isOpen: boolean
  onOpenChange: () => void
}

const linkTypes = [
  { label: 'LinkedIn', key: 'linkedin' },
  { label: 'Discord', key: 'discord' },
  { label: 'Website', key: 'website' },
  { label: 'Twitter', key: 'twitter' },
  { label: 'GitHub', key: 'github' }
]

const LinksDialog = ({ isOpen, onOpenChange }: LinksDialogProps) => {
  const { formData, setFormData } = useCardStore()

  const handleChange = (type: string, value: string) => {
    setFormData({
      ...formData,
      links: {
        ...formData.links,
        [type]: value
      }
    })
  }

  const links = formData.links || {}

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Links
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Links</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {linkTypes.map(({ label, key }) => (
            <div key={key} className="flex flex-col">
              <input
                type="text"
                placeholder={`Enter your ${label} URL`}
                className="border border-gray-300 p-2 rounded"
                value={links[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={onOpenChange} className="mt-4">
          Save Links
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default LinksDialog
