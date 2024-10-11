import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/create-free/links")({
  component: Links,
})

function Links() {
  return (
    <div>
      <h1>Links</h1>
    </div>
  )
}
