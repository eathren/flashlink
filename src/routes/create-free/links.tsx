import Links from "@/features/free/components/links"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/create-free/links")({
  component: Links,
})
