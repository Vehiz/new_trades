
import { auth } from '../firebase-config'; 
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { FaSignOutAlt } from "react-icons/fa";


const SignOut = ({ showLabel = true }) => {
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
    <button
      onClick={handleSignOut}
      className="group mt-6 flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm lg:text-base font-semibold text-gray-600 shadow-sm transition hover:text-red-600"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:text-red-600">
        <FaSignOutAlt className="text-base" />
      </span>
      <span className={`${showLabel ? "hidden sm:block" : "hidden"} leading-none`}>
        Sign Out
      </span>
    </button>
  );
};

export default SignOut;
