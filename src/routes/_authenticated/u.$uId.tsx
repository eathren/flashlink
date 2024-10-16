import Dashboard from '@/features/dashboard/components/dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/u/$uId')({
  component: Dashboard
})
