import axios from 'axios'
import React from 'react'
import ChartPage from './pages/charts and maps/chartPage'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Layout from './pages/Layout'
import Contact from './pages/contact/Contact'
import Profile from './pages/Profile'
import Home from './pages/Home'
import CreateContact from './pages/contact/CreateContact'
import EditContact from './pages/contact/EditContact'
import NotFound from './pages/NotFound'
import ContactNavigationPage from './pages/contact/ContactNav'
import ViewContact from './pages/contact/ViewContact'

const App = () => {
  const [data, setData] = React.useState<any>();
  axios.defaults.baseURL = 'http://localhost:8000'

  // console.log('Axios Base URL:', axios.defaults.baseURL);
  function apicall() {
    axios.get('/').then((res) => {
      setData(res.data);
      // console.log("res", res.data);
    }).catch((err) => console.log(err));
  }
  // console.log('Proxy Value:', window.location.origin);

  // console.log("data", data);

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout />}>
            <Route index element={<CreateContact />} />
            <Route path="/contact" element={<CreateContact />}></Route>
            <Route path="/contact/create" element={<CreateContact />} />
            <Route path="/contact/delete" element={<ViewContact />} />
            <Route path="/contact/users" element={<ViewContact />} />
            <Route path="/contact/edit" element={<EditContact />} />
            <Route index path="/chart" element={<ChartPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
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