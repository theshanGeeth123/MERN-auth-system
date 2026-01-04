import FloatingShape from './Components/FloatingShape.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './Pages/SignUp/SignUpPage.jsx';
import LoginPage from './Pages/Login/LoginPage.jsx';
import EmailVerficationPage from './Pages/EmailVerficationPage.jsx';
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';
import DashboardPage from './Pages/DashboardPage.jsx';
import LoadingSpinner from './Components/LoadingSpinner.jsx'
import ForgotPasswordPage from './Pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './Pages/ResetPasswordPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenicated, user } = useAuthStore();

  if (!isAuthenicated) {
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenicated, user } = useAuthStore();

  if (isAuthenicated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {



  const { isCheckingAuth, checkAuth, isAuthenicated, user } = useAuthStore();



  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("isAuthenticated ", isAuthenicated);
  console.log(user);

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div
      className='min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-blue-500 flex items-center justify-center relative overflow-hidden'
    >
      <FloatingShape color='bg-blue-200' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-blue-100' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-blue-100' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />

        <Route path='/verify-email' element={
          <RedirectAuthenticatedUser>
            <EmailVerficationPage />
          </RedirectAuthenticatedUser>

        } />

        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage></ForgotPasswordPage>
          </RedirectAuthenticatedUser>

        } />

        <Route 
          path='/reset-password/:token' 
          element={
            <RedirectAuthenticatedUser>
            <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
          }
        />

      </Routes>

      <Toaster />
    </div>
  );
}

export default App;