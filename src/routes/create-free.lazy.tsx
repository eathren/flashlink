import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

const CreateFree = () => {
  return <Outlet />
}

export const Route = createLazyFileRoute('/create-free')({
  component: CreateFree,
})
