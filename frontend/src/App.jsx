import FloatingShape from './Components/FloatingShape.jsx';
import {Routes, Route} from 'react-router-dom';
import SignUpPage from './Pages/SignUp/SignUpPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';


function App() {
  return (
    <div
      className='min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-blue-500 flex items-center justify-center relative overflow-hidden'
    >
      <FloatingShape color='bg-blue-200' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-blue-100' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-blue-100' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path='/' element={"home"}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;