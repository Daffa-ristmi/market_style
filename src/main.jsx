import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProductPage from './pages/Products.jsx'
import ProfilePage from './pages/profile.jsx'
import DetailProductPage from './pages/detailProduct.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    // errorElement : <ErrorPage/>
  },

  // {
  //   path: "/Login",
  //   element: <LoginPage/>
  // },

  {
    path: "/Register",
    element: <RegisterPage/>
  },

  {
    path: "/Products",
    element: <ProductPage/>
  },

  {
    path: "/profile",
    element: <ProfilePage/>
  },

  {
    path: "/product/:id",
    element: <DetailProductPage/>
  }
])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
