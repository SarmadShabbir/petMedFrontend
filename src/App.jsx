import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login Form/Login';
import SignUp from './Components/Login Form/SignUp';
import Doctorlogin from './Components/Doctor LoginForm/Doctorlogin';
import DoctorSignUp from './Components/Doctor LoginForm/DoctorSignUp';
import Dashboard from './Components/Dashboard Page/Dashboard';
import Doctordashboard from './Components/Doctor Dashboard Page/Doctordashboard';
import ComplaintForm from './Components/Complain Form/ComplaintForm';
import Blog from './Components/Blogs/Blog';
import Lab from './Components/Labs/Lab';
import DoctorSpecilists from './Components/Doctor Specialists/DoctorSpecilists';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userlogin' element={<Login />} />
          <Route path='/userSignUp' element={<SignUp />} />
          <Route path='/Doctorlogin' element={<Doctorlogin />} />
          <Route path='/DoctorSignUp' element={<DoctorSignUp />} />
          <Route path='/userdashboard' element={<Dashboard />} />
          <Route path='/doctor-dashboard' element={<Doctordashboard />} />
          <Route path='/complain-form' element={<ComplaintForm />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/labs' element={<Lab />} />
          <Route path='/doctor-specialists' element={<DoctorSpecilists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;