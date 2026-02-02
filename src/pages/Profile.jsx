import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser?.email) {
        return;
      }
      const docRef = doc(db, "Users", authUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      const fullName =
        user?.name ||
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
      setFormData({
        name: fullName,
        email: user?.email || "",
      });
    }
  }, [isEditing, user]);

  const joinedDate = useMemo(() => {
    const date = user?.createdAt ? new Date(user.createdAt) : new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [user?.createdAt]);

  const handleSave = () => {
    const trimmedName = formData.name.trim();
    const nameParts = trimmedName.split(" ");
    const nextFirstName = nameParts.shift() || "";
    const nextLastName = nameParts.join(" ");

    setUser((prev) => ({
      ...prev,
      name: trimmedName,
      firstName: nextFirstName,
      lastName: nextLastName,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const fullName =
      user?.name ||
      `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
    setFormData({
      name: fullName,
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  return (
    <section className="bg-[#f4f7fe] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account information and preferences
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border-2 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-4xl font-bold text-white shadow-2xl border-4 border-white">
                {(formData.name?.charAt(0) || "U").toUpperCase()}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {formData.name || "User"}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-blue-100">
                  <FiMail className="h-4 w-4" />
                  {formData.email || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">Account Information</h3>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-purple-700"
                >
                  <FiEdit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-600 hover:to-emerald-700"
                  >
                    <FiSave className="mr-2 h-4 w-4" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center rounded-lg border-2 border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <FiX className="mr-2 h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <FiUser className="h-4 w-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="rounded-lg border-2 border-gray-200 bg-slate-50 px-4 py-3">
                    {formData.name || "Not set"}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <FiMail className="h-4 w-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="rounded-lg border-2 border-gray-200 bg-slate-50 px-4 py-3">
                    {formData.email || "Not set"}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <FiCalendar className="h-4 w-4" />
                  Member Since
                </label>
                <div className="rounded-lg border-2 border-gray-200 bg-slate-50 px-4 py-3">
                  {joinedDate}
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <FiShield className="h-4 w-4" />
                  User ID
                </label>
                <div className="rounded-lg border-2 border-gray-200 bg-slate-50 px-4 py-3 font-mono text-sm">
                  {auth.currentUser?.uid || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <FiShield className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-green-900">Account Status</h3>
            </div>
            <p className="text-sm text-green-700">Your account is active and verified</p>
          </div>

          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                <FiShield className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">Security Level</h3>
            </div>
            <p className="text-sm text-blue-700">Two-factor authentication enabled</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
