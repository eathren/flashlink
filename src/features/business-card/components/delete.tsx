import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { TrashIcon } from 'lucide-react'
import { deleteSingleCard } from '../api'

interface DeleteCardProps {
  cardId: string
}

const DeleteCard: React.FC<DeleteCardProps> = ({ cardId }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteSingleCard(cardId)
      toast.success('Card deleted successfully')
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <TrashIcon className="h-5 w-5  mr-2" />
          Delete Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this card? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner height={18} width={18} /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCard
