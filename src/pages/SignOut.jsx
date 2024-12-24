
import { auth } from '../firebase-config'; 
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { FaSignOutAlt } from "react-icons/fa";


const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out');
      navigate('/login'); // Redirect to login page after sign-out
    } catch (error) {
      toast.error('Error signing out: ' + error.message);
    }
  };

  return (
    <button onClick={handleSignOut} className="group flex items-center text-sm lg:text-base gap-4 py-4 px-2 hover:bg-[#3454f5] hover:text-white rounded-md">
    <FaSignOutAlt className='mr-[20px] text-[16px]'/>
    <span className="hidden sm:block">Sign Out</span>
  </button>
  );
};

export default SignOut;
