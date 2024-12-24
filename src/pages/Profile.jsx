import { useEffect, useState } from "react";
import Footer from "./Footer";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    state: '',
    zip: ''
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        toast.success("Password updated successfully");
      } else {
        toast.error("No user is signed in");
      }
    } catch (error) {
      toast.error("Error updating password: " + error.message);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  auth.onAuthStateChanged(async (user) => {
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  });
},[]);

  return (
    <section className="bg-[#f4f7fe]">
      <div className="flex flex-wrap mx-[15px]">
        <div className="w-full mt-[20px] lg:w-1/3 px-[15px] mb-[30px]">
          <div className="bg-[#fff] rounded-lg shadow-outline-white shadow-md border mb-[30px]">
            <div className="px-[30px] py-[15px]">
              <h4 className="text-[24px]">
                <strong>About</strong>
              </h4>
            </div>
            <div className="p-[20px]">
              <div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="w-full lg:w-2/3 px-[15px] mb-[30px]">
          <div className="bg-[#fff] text-[14px] w-full rounded-lg shadow-outline-white shadow-md border mb-[30px]">
            <div className="px-[30px] py-[15px]">
              <h4 className="text-[24px]">
                <strong>Personal details</strong>
              </h4>
            </div>
            <div className="p-[30px]">
              <form className="grid gap-[25px]">
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="firstname" className="w-full lg:w-auto">
                    First Name
                  </label>
                  <div className="w-full lg:w-[85%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={user.firstName}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="lastname" className="w-full lg:w-auto">
                    Last Name
                  </label>
                  <div className="w-full lg:w-[85%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={user.lastName}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="email" className="w-full lg:w-auto">
                    Email
                  </label>
                  <div className="w-full lg:w-[85%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="text"
                      name="email"
                      id="email"
                      value={user.email}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="phone" className="w-full lg:w-auto">
                    Phone
                  </label>
                  <div className="w-full lg:w-[85%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="text"
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="country" className="w-full lg:w-auto">
                    Country
                  </label>
                  <div className="w-full lg:w-[85%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="text"
                      name="country"
                      id="country"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="address" className="w-full lg:w-auto">
                    Address
                  </label>
                  <div className="flex w-full lg:w-[85%] mt-[10px] lg:mt-0 space-x-[12px]">
                    <input
                      className="w-1/3 border rounded px-[12px] py-[9px]"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                    />
                    <input
                      className="w-1/3 border rounded px-[12px] py-[9px]"
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                    />
                    <input
                      className="w-1/3 border rounded px-[12px] py-[9px]"
                      type="text"
                      name="zip"
                      id="zip"
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <button
                  className="bg-[#3454f5] text-[14px] text-white px-[23px] py-[5px] rounded mt-[20px]"
                  type="submit"
                  disabled

                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="bg-[#fff] text-[14px] w-full rounded-lg shadow-outline-white shadow-md border">
            <div className="px-[30px] text-[24px] py-[15px]">
              <h4 className="text-[24px]">
                <strong>Change Password</strong>
              </h4>
            </div>
            <div className="p-[30px]">
              <form onSubmit={handleChangePassword} className="grid gap-[25px]">
                <div className="flex flex-wrap justify-between w-full">
                  <label
                    htmlFor="current_password"
                    className="w-full lg:w-auto"
                  >
                    Current password
                  </label>
                  <div className="w-full lg:w-[80%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="password"
                      name="current_password"
                      id="current_password"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label htmlFor="new_password" className="w-full lg:w-auto">
                    New password
                  </label>
                  <div className="w-full lg:w-[80%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="password"
                      name="new_password"
                      id="new_password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                  <label
                    htmlFor="confirm_password"
                    className="w-full lg:w-auto"
                  >
                    Confirm password
                  </label>
                  <div className="w-full lg:w-[80%] mt-[10px] lg:mt-0">
                    <input
                      className="w-full border rounded px-[15px] py-[9px]"
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  className="bg-[#3454f5] text-[14px] text-white px-[23px] py-[5px] rounded mt-[20px]"
                  type="submit"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Profile;
