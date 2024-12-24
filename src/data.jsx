import CarouselImg1 from "./assets/cauroselImg1.jpeg"
import CarouselImg2 from "./assets/cauroselImg2.jpeg"
import CarouselImg3 from "./assets/cauroselImg3.jpeg"
import { AiOutlineDashboard } from "react-icons/ai";
import { PiMinusCircle } from "react-icons/pi";
import { PiPlusCircle } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";





export const customers =[
    {
        id : 1,
        name: "John doe",
        img: CarouselImg1,
        jobTitle: "Financial Analyst",
        review: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum"
    },
    {
        id: 2,
        name: "John doe",
        img:CarouselImg2,
        jobTitle: "Financial Analyst",
        review: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum"
    },
    {
        id: 3,
        name: "John doe",
        img:CarouselImg3,
        jobTitle: "Financial Analyst",
        review: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum"
    },
    
]

export const menus = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, link: "/account/dashboard" },
    { name: "Deposits", icon: <PiPlusCircle />, link: "/account/deposit" },
    { name: "Withdraw", icon: <PiMinusCircle />, link: "/account/withdraw" },
    { name: "Transactions", icon: <CiStar />, link: "/account/transactions" },
    { name: "Profile", icon: <FaUserCircle />, link: "/account/profile" },
    { name: "Verification", icon: <FaUserCheck />, link: "/account/verification" },
    // { name: "SignOut", icon: <FaSignOutAlt />, link: "/account/signOut"},
  ];
