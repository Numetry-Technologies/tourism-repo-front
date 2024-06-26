import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import links from "../NavLinks/links";
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { getCurrentUserDetail, isLogin,doLogout } from "../Auth";
import { useNavigate } from "react-router-dom";
import turnoff from '../assets/turn-off.png';
import { Select } from "@material-tailwind/react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  

  let [currentUser, setCurrentUser] = useState(undefined);

  let navigate = useNavigate();

  const [username, setUsername] = useState();
  const[login,setLogin]=useState(false)


  useEffect(() => {

    setLogin(isLogin());
    setCurrentUser(getCurrentUserDetail())

    if (currentUser != null) {
      setUsername(currentUser.userDto.name)
    }
  },[login])

  
  const Logout = () => {
    doLogout(() => {
      setLogin(false)
      navigate("/signup");

    })

  }


  

  return (
    <nav className="bg-white dark:bg-[#000080] fixed w-full z-[999] top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3">
        <Link to="/" className="flex items-center overflow-hidden p-0 rtl:space-x-reverse">
          <img src={logo} className="h-20 w-22" alt="Indian Traverse Logo" />
          <span className="self-center font-semibold whitespace-nowrap dark:text-white text-base md:text-lg lg:text-2xl">
            <span className="text-orange-600">In</span>di<span className="text-green-600">an</span> Traverse
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
         {

            !login &&  <NavLink
              to="/login"
              className="text-blue-600 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-black font-bold rounded-lg text-md px-4 py-2 text-center dark:bg-white dark:hover:bg-[#e2e8f0] dark:focus:ring-blue-500"
               >
               Login
            </NavLink>

         }

         {
            
             login && <div className="border rounded-full px-3 h-8 hover:bg-gray-100 shadow min-w-[90px] flex gap-2 justify-center align-center">
             <NavLink onClick={Logout}>
               <img className="w-6" src={turnoff}></img>
             </NavLink>
            
             <p className="text-xl text-blue-600">{username}</p>

           </div>

          

              
         }
          
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${open ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  activeClassName="text-blue-700 dark:text-gray-500"
                  exact
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
