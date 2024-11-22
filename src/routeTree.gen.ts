/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutHeaderImport } from './routes/_layoutHeader'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as SSIdImport } from './routes/s.$sId'
import { Route as CCIdImport } from './routes/c.$cId'
import { Route as AuthCCIdEditImport } from './routes/_auth/c/$cId/edit'

// Create Virtual Routes

const SignUpLazyImport = createFileRoute('/sign-up')()
const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const PricingLazyImport = createFileRoute('/pricing')()
const LoginLazyImport = createFileRoute('/login')()
const CreateFreeLazyImport = createFileRoute('/create-free')()
const CreateFreeIndexLazyImport = createFileRoute('/create-free/')()
const CreateFreePreviewLazyImport = createFileRoute('/create-free/preview')()

// Create/Update Routes

const SignUpLazyRoute = SignUpLazyImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sign-up.lazy').then((d) => d.Route))

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reset-password.lazy').then((d) => d.Route),
)

const PricingLazyRoute = PricingLazyImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/pricing.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const CreateFreeLazyRoute = CreateFreeLazyImport.update({
  id: '/create-free',
  path: '/create-free',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/create-free.lazy').then((d) => d.Route))

const LayoutHeaderRoute = LayoutHeaderImport.update({
  id: '/_layoutHeader',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CreateFreeIndexLazyRoute = CreateFreeIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => CreateFreeLazyRoute,
} as any).lazy(() =>
  import('./routes/create-free/index.lazy').then((d) => d.Route),
)

const CreateFreePreviewLazyRoute = CreateFreePreviewLazyImport.update({
  id: '/preview',
  path: '/preview',
  getParentRoute: () => CreateFreeLazyRoute,
} as any).lazy(() =>
  import('./routes/create-free/preview.lazy').then((d) => d.Route),
)

const SSIdRoute = SSIdImport.update({
  id: '/s/$sId',
  path: '/s/$sId',
  getParentRoute: () => rootRoute,
} as any)

const CCIdRoute = CCIdImport.update({
  id: '/c/$cId',
  path: '/c/$cId',
  getParentRoute: () => rootRoute,
} as any)

const AuthCCIdEditRoute = AuthCCIdEditImport.update({
  id: '/c/$cId/edit',
  path: '/c/$cId/edit',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_layoutHeader': {
      id: '/_layoutHeader'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutHeaderImport
      parentRoute: typeof rootRoute
    }
    '/create-free': {
      id: '/create-free'
      path: '/create-free'
      fullPath: '/create-free'
      preLoaderRoute: typeof CreateFreeLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingLazyImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/sign-up': {
      id: '/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof SignUpLazyImport
      parentRoute: typeof rootRoute
    }
    '/c/$cId': {
      id: '/c/$cId'
      path: '/c/$cId'
      fullPath: '/c/$cId'
      preLoaderRoute: typeof CCIdImport
      parentRoute: typeof rootRoute
    }
    '/s/$sId': {
      id: '/s/$sId'
      path: '/s/$sId'
      fullPath: '/s/$sId'
      preLoaderRoute: typeof SSIdImport
      parentRoute: typeof rootRoute
    }
    '/create-free/preview': {
      id: '/create-free/preview'
      path: '/preview'
      fullPath: '/create-free/preview'
      preLoaderRoute: typeof CreateFreePreviewLazyImport
      parentRoute: typeof CreateFreeLazyImport
    }
    '/create-free/': {
      id: '/create-free/'
      path: '/'
      fullPath: '/create-free/'
      preLoaderRoute: typeof CreateFreeIndexLazyImport
      parentRoute: typeof CreateFreeLazyImport
    }
    '/_auth/c/$cId/edit': {
      id: '/_auth/c/$cId/edit'
      path: '/c/$cId/edit'
      fullPath: '/c/$cId/edit'
      preLoaderRoute: typeof AuthCCIdEditImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthCCIdEditRoute: typeof AuthCCIdEditRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthCCIdEditRoute: AuthCCIdEditRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface CreateFreeLazyRouteChildren {
  CreateFreePreviewLazyRoute: typeof CreateFreePreviewLazyRoute
  CreateFreeIndexLazyRoute: typeof CreateFreeIndexLazyRoute
}

const CreateFreeLazyRouteChildren: CreateFreeLazyRouteChildren = {
  CreateFreePreviewLazyRoute: CreateFreePreviewLazyRoute,
  CreateFreeIndexLazyRoute: CreateFreeIndexLazyRoute,
}

const CreateFreeLazyRouteWithChildren = CreateFreeLazyRoute._addFileChildren(
  CreateFreeLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof LayoutHeaderRoute
  '/create-free': typeof CreateFreeLazyRouteWithChildren
  '/login': typeof LoginLazyRoute
  '/pricing': typeof PricingLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/sign-up': typeof SignUpLazyRoute
  '/c/$cId': typeof CCIdRoute
  '/s/$sId': typeof SSIdRoute
  '/create-free/preview': typeof CreateFreePreviewLazyRoute
  '/create-free/': typeof CreateFreeIndexLazyRoute
  '/c/$cId/edit': typeof AuthCCIdEditRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof LayoutHeaderRoute
  '/login': typeof LoginLazyRoute
  '/pricing': typeof PricingLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/sign-up': typeof SignUpLazyRoute
  '/c/$cId': typeof CCIdRoute
  '/s/$sId': typeof SSIdRoute
  '/create-free/preview': typeof CreateFreePreviewLazyRoute
  '/create-free': typeof CreateFreeIndexLazyRoute
  '/c/$cId/edit': typeof AuthCCIdEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_layoutHeader': typeof LayoutHeaderRoute
  '/create-free': typeof CreateFreeLazyRouteWithChildren
  '/login': typeof LoginLazyRoute
  '/pricing': typeof PricingLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/sign-up': typeof SignUpLazyRoute
  '/c/$cId': typeof CCIdRoute
  '/s/$sId': typeof SSIdRoute
  '/create-free/preview': typeof CreateFreePreviewLazyRoute
  '/create-free/': typeof CreateFreeIndexLazyRoute
  '/_auth/c/$cId/edit': typeof AuthCCIdEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/create-free'
    | '/login'
    | '/pricing'
    | '/reset-password'
    | '/sign-up'
    | '/c/$cId'
    | '/s/$sId'
    | '/create-free/preview'
    | '/create-free/'
    | '/c/$cId/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/pricing'
    | '/reset-password'
    | '/sign-up'
    | '/c/$cId'
    | '/s/$sId'
    | '/create-free/preview'
    | '/create-free'
    | '/c/$cId/edit'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_layoutHeader'
    | '/create-free'
    | '/login'
    | '/pricing'
    | '/reset-password'
    | '/sign-up'
    | '/c/$cId'
    | '/s/$sId'
    | '/create-free/preview'
    | '/create-free/'
    | '/_auth/c/$cId/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  LayoutHeaderRoute: typeof LayoutHeaderRoute
  CreateFreeLazyRoute: typeof CreateFreeLazyRouteWithChildren
  LoginLazyRoute: typeof LoginLazyRoute
  PricingLazyRoute: typeof PricingLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  SignUpLazyRoute: typeof SignUpLazyRoute
  CCIdRoute: typeof CCIdRoute
  SSIdRoute: typeof SSIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  LayoutHeaderRoute: LayoutHeaderRoute,
  CreateFreeLazyRoute: CreateFreeLazyRouteWithChildren,
  LoginLazyRoute: LoginLazyRoute,
  PricingLazyRoute: PricingLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  SignUpLazyRoute: SignUpLazyRoute,
  CCIdRoute: CCIdRoute,
  SSIdRoute: SSIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_layoutHeader",
        "/create-free",
        "/login",
        "/pricing",
        "/reset-password",
        "/sign-up",
        "/c/$cId",
        "/s/$sId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/c/$cId/edit"
      ]
    },
    "/_layoutHeader": {
      "filePath": "_layoutHeader.tsx"
    },
    "/create-free": {
      "filePath": "create-free.lazy.tsx",
      "children": [
        "/create-free/preview",
        "/create-free/"
      ]
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/pricing": {
      "filePath": "pricing.lazy.tsx"
    },
    "/reset-password": {
      "filePath": "reset-password.lazy.tsx"
    },
    "/sign-up": {
      "filePath": "sign-up.lazy.tsx"
    },
    "/c/$cId": {
      "filePath": "c.$cId.tsx"
    },
    "/s/$sId": {
      "filePath": "s.$sId.tsx"
    },
    "/create-free/preview": {
      "filePath": "create-free/preview.lazy.tsx",
      "parent": "/create-free"
    },
    "/create-free/": {
      "filePath": "create-free/index.lazy.tsx",
      "parent": "/create-free"
    },
    "/_auth/c/$cId/edit": {
      "filePath": "_auth/c/$cId/edit.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
