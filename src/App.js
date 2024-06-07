import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/todo/login';
import Welcome from './components/todo/welcome';
import ListTodos from './components/todo/listTodos';
import Header from './components/generic/header';
import Footer from './components/generic/footer';
import Logout from './components/todo/logout';
import AuthProvider, { useAuth } from './components/security/AuthContext';
import Todo from './components/todo/todo';

function App() {

  function ErrorNotFound(){
    return(
      <h1>Ups wrong URL - 404</h1>
    );
  }

  function AuthRoute({children}){
    const context = useAuth()
    if ( context.isAuthenticated ){
      return children
    }
    return (<Navigate to="/"></Navigate>)
  }

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Header/>

          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/welcome/:username' element={<AuthRoute><Welcome/></AuthRoute>}/>
            <Route path='/todos/:id' element={<AuthRoute><Todo/></AuthRoute>}/>
            <Route path='/list' element={<AuthRoute><ListTodos/></AuthRoute>}/>
            <Route path='/logout' element={<AuthRoute><Logout/></AuthRoute>}/>
            <Route path='*' element={<ErrorNotFound/>}/>
          </Routes>

          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
