import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, NavLink, Outlet, redirect} from 'react-router-dom'
import { Home } from './components'
import './index.css'
import { Register, Login, Profile } from './pages'
import { storage } from './utils/storage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

const Layout = () => {
  const { token, logout } = useAuth()
  return (
    <div>
      <nav style={{backgroundColor:'beige', padding: '20px'}}>
        <strong>API Auth Demo</strong>
        <div>
          <NavLink to='/'>Inicio | </NavLink>
          <NavLink to='/register'>Registro |</NavLink>
          { !token ? <NavLink to='/login'>Login |</NavLink> 
          : <> 
              <NavLink to='/profile'>Profile |</NavLink> 
              <button onClick={logout}>Logout</button>
            </>
          }
          
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

//Autenticación con redirect -- Si no está autenticado , redirige al login
const requireAuth = () => {
  const tokenAuth = storage.get('token')
  if(!tokenAuth) throw redirect('/login')
  return null
}

const routes = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      { //Ruta protegida
        path: '/profile',
        element: <Profile />,
        loader: requireAuth
      }

    ]
  }
]

const router =  createBrowserRouter(routes)

//Aquí usamos el contexto con los estados globales
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
