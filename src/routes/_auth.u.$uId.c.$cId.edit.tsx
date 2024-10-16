import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/u/$uId/c/$cId/edit')({
  component: () => <div>Hello /_auth/u/$uId/c/$cId/edit!</div>
})
