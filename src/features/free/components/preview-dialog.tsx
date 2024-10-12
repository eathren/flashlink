import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PreviewCard from "@/features/free/components/preview-card"

interface PreviewDialogProps {
  isOpen: boolean
  onOpenChange: () => void
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl mx-auto p-4">
        <DialogHeader>
          <DialogTitle hidden={true}>Preview</DialogTitle>
        </DialogHeader>
        <PreviewCard />
        <Button variant="outline" onClick={onOpenChange}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialog
