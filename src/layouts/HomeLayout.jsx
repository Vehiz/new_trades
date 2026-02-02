import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    
  return (
    <div className="overflow-x-hidden">
       <Outlet />   
    </div>
  )
}

export default HomeLayout