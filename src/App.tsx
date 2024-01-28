import './App.css';
import Login from './pages/Login';
import Skeleton from './components/Skeleton';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';

function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Skeleton />}/>
        </Routes>        
      </main>
    </>
  )
}

export default App
