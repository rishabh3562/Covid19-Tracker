import React from 'react'
import ChartPage from './pages/chartPage'
import Sidebar from './components/Sidebar'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom'
import Layout from './pages/Layout'
import { Contact } from './pages/Contact'
import { Profile } from './pages/Profile'
import Home from './pages/Home'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
      <Route path="/chart" element={<ChartPage/>}/>
<Route path="/profile" element={<Profile/>}/>
      </Route>

    </Routes>

    
    </BrowserRouter>
{/* <ChartPage/> */}
    </>
  )
}

export default App