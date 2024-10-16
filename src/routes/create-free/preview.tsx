import { createFileRoute } from '@tanstack/react-router'
import PreviewCard from '@/features/free/components/preview-card'

export const Route = createFileRoute('/create-free/preview')({
  component: PreviewCard
})
