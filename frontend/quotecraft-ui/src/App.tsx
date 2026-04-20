import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/NavBar'
import LandingPage from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RegisterPage } from './pages/RegisterPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProtectedNavBar } from './components/ProtectedNavBar'
import { GeneratePage } from './pages/GeneratePage'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';

function AppLayout(){
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      {/* Public NavBar */}
      <NavBar />

      <div className='w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-10 flex-1'>
        <main className='w-full'>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
    </div>
  )
}

function AppLayoutProtected(){
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      {/* Public NavBar */}
      {/* <NavBar /> */}
      <ProtectedNavBar />

      <div className='w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-10 flex-1'>
        <main className='w-full'>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
    </div>
  )
}

function App() {

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
   <Routes>
    <Route path='/' element={<AppLayout />}>
      <Route index element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Route>

    <Route path='/app' element={
        <ProtectedRoute>
          <AppLayoutProtected />
        </ProtectedRoute>
      }>
        {/* Future protected routes will go here */}
        <Route index element={<Navigate to="/app/generate" replace />} />
        <Route path='generate' element={<GeneratePage />} />
      </Route>
   </Routes>
   </GoogleOAuthProvider>
  )
}

export default App
