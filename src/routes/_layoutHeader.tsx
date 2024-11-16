import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layoutHeader')({
  component: () => <div>Hello /_layoutHeader!</div>,
})
