
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Navbar from './Navbar/Navbar'


const Layout = () => {
    const auth = useAuth()
    const navigate = useNavigate();
    useEffect(()=>
    {
        // if (!auth.isLogin)
        // {
        //     navigate('/login');
        // }
    })
    return (
     <>
        <Navbar />
        <main className="App">
            
            <Outlet />
        </main>
    
     </>
    )
}

export default Layout