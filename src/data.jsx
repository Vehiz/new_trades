import CarouselImg1 from "./assets/cauroselImg1.jpeg"
import CarouselImg2 from "./assets/cauroselImg2.jpeg"
import CarouselImg3 from "./assets/cauroselImg3.jpeg"
import {
    HiOutlineViewGrid,
    HiOutlinePlus,
    HiOutlineMinus,
    HiOutlineDocumentText,
    HiOutlineUserCircle,
    HiOutlineShieldCheck,
} from "react-icons/hi";





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
    { name: "Dashboard", icon: <HiOutlineViewGrid />, link: "/account/dashboard" },
    { name: "Deposits", icon: <HiOutlinePlus />, link: "/account/deposit" },
    { name: "Withdraw", icon: <HiOutlineMinus />, link: "/account/withdraw" },
    { name: "Transactions", icon: <HiOutlineDocumentText />, link: "/account/transactions" },
    { name: "Verification", icon: <HiOutlineShieldCheck />, link: "/account/verification" },
    // { name: "SignOut", icon: <FaSignOutAlt />, link: "/account/signOut"},
  ];
