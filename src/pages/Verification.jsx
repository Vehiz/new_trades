import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload"; // Assuming FileUpload is a component to handle file input
import Footer from "../pages/Footer";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import axios from "axios";

const Verification = () => {
  const [user, setUser] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const emailVerify = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent");
    } catch {
      toast.error("Error sending verification email");
    }
  };

  const handleFrontView = (event) => {
    setFrontImage(event.target.files[0]);
  };

  const handleBackView = (event) => {
    setBackImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!frontImage && !backImage) {
      toast.error("Please upload both front and back view images.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", frontImage);
      formData.append("file", backImage);
      formData.append("upload_preset", "slhqrxii");
      await axios.post("https://api.cloudinary.com/v1_1/dpr64v1lo/image/upload", formData)


      toast.success("Images uploaded successfully.");
      setIdVerified(true); // Set ID verified to true
    } catch (error) {
      toast.error("Error saving images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f4f7fe]">
      <div className="flex w-full flex-wrap bg-[#f4f7fe] p-4 lg:p-4">
  <div className="w-full lg:w-[60%] lg:my-4  lg:mb-6 lg:px-">
    <div className="bg-white rounded-lg shadow-md mb-6 border p-6">
      <div className="text-xl leading-[30px] font-semibold mb-4">
        <h4>Verification Status</h4>
      </div>
      <div className="grid gap-4">
        <div className="flex space-x-2 items-center">
          <p className="text-[22px]">Email :</p>
          {user?.emailVerified ? (
            <div className="flex justify-center bg-green-500 text-xs w-[90px] rounded-3xl p-2 text-white">
              <strong>Verified</strong>
            </div>
          ) : (
            <button
              onClick={emailVerify}
              type="button"
              className="text-center text-sm font-bold rounded-xl py-2 px-4 border-2"
            >
              Not Verified
            </button>
          )}
        </div>
        <div>
          <div className="flex space-x-2 items-center mb-4">
            <p className="text-[22px]">Verify Id :</p>
            <div
              className={`${
                idVerified ? "bg-green-500" : "bg-red-500"
              } text-sm text-center rounded-xl py-2 px-4 text-white`}
            >
              <strong>{idVerified ? "Verified" : "Not Verified"}</strong>
            </div>
          </div>
          <p>
            {idVerified
              ? "Your identity is verified."
              : "Your identity is not verified. To verify your account, please upload a valid government issued Id to request verification."}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-[70%] bg-white rounded-lg shadow-md border lg:mt-0 p-6">
    <div>
      <div className="w-full text-xl leading-[30px] font-semibold mb-4">
        <h4>Submit Verification</h4>
      </div>
      <div>
        <h6 className="mb-4 text-lg">
          The document should clearly show the following
        </h6>
        <div className="flex flex-wrap">
          <div className="px-4 w-full sm:w-1/2 mb-4 sm:mb-0">
            <p>
              <small>
                <span>*</span> Full name
              </small>
              <br />
              <small>
                <span>*</span> Date of birth
              </small>
              <br />
              <small>
                <span>*</span> Photo
              </small>
              <br />
            </p>
          </div>
          <div className="px-4 w-full sm:w-1/2">
            <p>
              <small>
                <span>*</span> Expiry date
              </small>
              <br />
              <small>
                <span>*</span> Document number
              </small>
              <br />
              <small>
                <span>*</span> Your signature
              </small>
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="my-6 px-4 w-full sm:w-1/2">
          <div className="space-y-4">
            <h6>Front View</h6>
            <p className="mb-1">
              <small>Upload the front view of the document</small>
            </p>
            <div>
              <FileUpload handleFileChange={handleFrontView} />
            </div>
          </div>
        </div>
        <div className="my-6 px-4 w-full sm:w-1/2">
          <div className="space-y-4">
            <h6>Back View</h6>
            <p className="mb-1">
              <small>Upload the back view of the document</small>
            </p>
            <div>
              <FileUpload handleFileChange={handleBackView} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
</div>

      <Footer />
    </section>
  );
};

export default Verification;
