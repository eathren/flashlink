import { useState } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
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

const firestore = getFirestore()

const DeleteCard = () => {
  const { cId } = useParams({ from: '/_auth/c/$cId/edit' })

  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const cardDocRef = doc(firestore, 'businessCards', cId)
      await deleteDoc(cardDocRef)
      toast.success('Business card deleted successfully')
      navigate({ to: '/' }) // Redirect to the home page or another appropriate page
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
        <Button variant="destructive">Delete Card</Button>
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
            {isDeleting ? <Spinner /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCard
