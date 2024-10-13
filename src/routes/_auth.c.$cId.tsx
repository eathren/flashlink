import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/c/$cId')({
  component: () => <div>Hello /_auth/c/$cId!</div>,
})
