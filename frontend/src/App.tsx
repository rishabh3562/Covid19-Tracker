import axios from 'axios'
import React from 'react'
import ChartPage from './pages/chartPage'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Layout from './pages/Layout'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Test from './pages/Test'
import TestGraph from './pages/TestGraph'


const App = () => {
  const [data, setData] = React.useState<any>();
  axios.defaults.baseURL = 'http://localhost:8000'

  console.log('Axios Base URL:', axios.defaults.baseURL);
  function apicall() {
    axios.get('/').then((res) => {
      setData(res.data);
      console.log("res", res.data);
    }).catch((err) => console.log(err));
  }
  console.log('Proxy Value:', window.location.origin);

  // console.log("data", data);

  return (
    <>
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout/>}>
        <Route  element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
      <Route index path="/chart" element={<ChartPage/>}/>
<Route path="/profile" element={<Profile/>}/>
      </Route>

    </Routes>

    
    </BrowserRouter> </>
  );
}

export default App;







     {/* <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout/>}>
        <Route  element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
      <Route index path="/chart" element={<ChartPage/>}/>
<Route path="/profile" element={<Profile/>}/>
      </Route>

    </Routes>

    
    </BrowserRouter> */}