import { Loader } from '@/components/ui/spinner'
import CreateFreeCard from '@/features/free/components/create-free-card'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

function CreateFree() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateFreeCard />
    </Suspense>
  )
}

export const Route = createLazyFileRoute('/create-free/')({
  component: CreateFree,
})
