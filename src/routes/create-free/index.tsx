import { Loader } from '@/components/ui/spinner'
import CreateFreeCard from '@/features/free/components/create-free-card'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

function CreateFree() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateFreeCard />
    </Suspense>
  )
}

export const Route = createFileRoute('/create-free/')({
  component: CreateFree
})
