import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import PreviewCard from '@/features/free/components/preview-card'
import { Link } from '@tanstack/react-router'

interface PreviewDialogProps {
  isOpen: boolean
  onOpenChange: () => void
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({
  isOpen,
  onOpenChange
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
        <p className="text-center">
          Like what you see? Sign up today and get this feature, online sharing,
          multiple online cards, and more!
        </p>
        <div className="flex flex-col space-y-2 mt-4">
          <span className="flex flex-row space-x-2">
            <Button variant="outline" onClick={onOpenChange} className="flex-1">
              Close
            </Button>
            <Link to="/sign-up" className="flex-1">
              <Button variant="default" className="w-full">
                Sign Up
              </Button>
            </Link>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialog
