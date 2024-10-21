import { createLazyFileRoute } from '@tanstack/react-router'
import PreviewCard from '@/features/free/components/preview-card'

export const Route = createLazyFileRoute('/create-free/preview')({
  component: PreviewCard,
})
