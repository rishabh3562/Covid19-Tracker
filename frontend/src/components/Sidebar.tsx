import React, { useState } from 'react';
import { FaBars, FaHome, FaTasks, FaUser } from 'react-icons/fa';
import { FunctionBody } from 'typescript';
import { Link ,useOutlet,useParams} from 'react-router-dom';
import { links } from '../constants/constants';
interface SidebarItemProps {
  name: string;
  icon: React.ReactNode;
  links: string;
}

interface HeadingProps {
  title: string;
}
interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar:React.FC<NavbarProps> = ({isSidebarOpen,setIsSidebarOpen}) => {
  
  
    const toggleNav = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  const outlet = useOutlet();
  const params = useParams();
  // console.log("params",params);
  // console.log("outlet",outlet);
    return (
     <>
     <nav className="bg-gray-800">
  <div className="container mx-auto flex items-center justify-between p-4">
    <div className='flex justify-between items-center gap-2'>
    <button
     onClick={toggleNav}
     className=" text-white focus:outline-none"
   >
     <FaBars className="h-6 w-6" />
   </button>
    <div className="text-white font-bold text-xl">My Website</div>
    </div>
    <ul className="flex space-x-4">
      <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
      <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
      <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
      <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
    </ul>
  </div>
</nav>

     </>
    );
  };
  
const SidebarHeading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <li className="my-px">
      <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">{title}</span>
    </li>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ name, icon,links }) => {
  return (
    <li className="my-px">
        <Link to={links}>
     
        <span className="flex items-center justify-center text-lg text-gray-500">{icon}</span>
        <span className="ml-3">{name}</span>
    
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (<>
<Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

    <div className="flex   bg-gray-100">
      <div
        className={`fixed z-10 top-0 left-0 h-full bg-gray-800 w-64 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform ease-in-out duration-300 z-50`}
      >
        <div className="flex items-center justify-between bg-gray-800 h-16 px-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-100">My Sidebar</h1>
        </div>
        <ul className="flex flex-col w-full mt-8">
          <SidebarHeading title="Dashboard" />
          <SidebarItem name="Contact" icon={<FaHome />} links={links.contact.base}  />
          <SidebarItem name="Charts" icon={<FaTasks />} links={links.charts} />
          <SidebarItem name="Profile" icon={<FaUser />} links={links.profile} />
        </ul>
      </div>
      {/* <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-gray-800 h-16 flex items-center justify-between px-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-100">Page Content</h1>
        </div>
      
      </div> */}
    </div>
    </>
  );
};

export default Sidebar;
