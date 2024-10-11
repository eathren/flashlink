import { createFileRoute } from "@tanstack/react-router"
import { lazy, Suspense } from "react"

const CreateFreeCard = lazy(
  () => import("@/features/free/components/create-free-card")
)

function CreateFree() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateFreeCard />
    </Suspense>
  )
}

export const Route = createFileRoute("/create-free/")({
  component: CreateFree,
})
