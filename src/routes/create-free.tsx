import { createFileRoute, Outlet } from '@tanstack/react-router'

const CreateFree = () => {
  return <Outlet />
}

export const Route = createFileRoute('/create-free')({
  component: CreateFree
})
