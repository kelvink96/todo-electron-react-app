import { ReactElement } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layout'
import { CompletedPage, GenericErrorPage, MyDayPage, PlannedPage } from './pages'

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GenericErrorPage />,
    children: [{ path: '', element: <MyDayPage /> }]
  },
  {
    path: 'planned',
    element: <MainLayout />,
    errorElement: <GenericErrorPage />,
    children: [{ path: '', element: <PlannedPage /> }]
  },
  {
    path: 'completed',
    element: <MainLayout />,
    errorElement: <GenericErrorPage />,
    children: [{ path: '', element: <CompletedPage /> }]
  }
])

export const AppRoutes = (): ReactElement => {
  return <RouterProvider router={router} />
}
