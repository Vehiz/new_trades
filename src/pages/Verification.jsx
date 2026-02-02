import { useState } from "react";
import { toast } from "react-toastify";

const Verification = () => {
  const [level, setLevel] = useState("basic");
  const [basicCompleted, setBasicCompleted] = useState(false);
  const [advancedCompleted, setAdvancedCompleted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileUpload = (field) => (event) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments({
        ...documents,
        [field]: event.target.files[0],
      });
    }
  };

  const handleBasicSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setBasicCompleted(true);
      toast.success("Basic verification completed!", {
        description: "You can now trade up to $10,000 per day",
      });
    }, 1000);
  };

  const handleAdvancedSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      setAdvancedCompleted(true);
      toast.success("Advanced verification completed!", {
        description: "You now have unlimited trading access",
      });
    }, 1000);
  };

  return (
    <section className="bg-[#f4f7fe] px-4 sm:px-6 py-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 bg-white/80 rounded-2xl p-6 border-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 sm:p-4 rounded-xl shadow-lg shadow-cyan-500/50">
              <span className="text-white text-lg sm:text-xl font-bold">ID</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Account Verification
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1 dark:text-slate-400">
                Verify your identity to unlock higher trading limits
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 dark:border-blue-500/40 dark:from-blue-500/10 dark:to-cyan-500/10">
          <p className="text-blue-900 text-sm dark:text-blue-200">
            Complete verification to increase your trading limits and unlock additional features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            className={`border-2 rounded-2xl cursor-pointer transition-all bg-white dark:bg-slate-900 dark:border-slate-800 ${
              level === "basic"
                ? "border-green-500 shadow-xl shadow-green-500/20"
                : "hover:border-green-300"
            }`}
            onClick={() => setLevel("basic")}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                    <span className="text-white font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Basic Verification</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Up to $10,000/day</p>
                  </div>
                </div>
                {basicCompleted && (
                  <div className="bg-green-500 rounded-full px-2 py-1 text-white text-xs font-semibold">
                    Verified
                  </div>
                )}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Personal information
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Phone verification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Email confirmation
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`border-2 rounded-2xl cursor-pointer transition-all bg-white dark:bg-slate-900 dark:border-slate-800 ${
              level === "advanced"
                ? "border-purple-500 shadow-xl shadow-purple-500/20"
                : "hover:border-purple-300"
            }`}
            onClick={() => setLevel("advanced")}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Advanced Verification</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Unlimited trading</p>
                  </div>
                </div>
                {advancedCompleted && (
                  <div className="bg-purple-500 rounded-full px-2 py-1 text-white text-xs font-semibold">
                    Verified
                  </div>
                )}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Government-issued ID
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Proof of address
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Selfie verification
                </li>
              </ul>
            </div>
          </div>
        </div>

        {level === "basic" && (
          <div className="border-2 rounded-2xl bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-2xl p-5">
              <h3 className="text-2xl font-semibold">Basic Verification Form</h3>
              <p className="text-green-50 text-sm">Complete your basic profile information</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleBasicSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dateOfBirth" className="text-sm font-medium">
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/50 hover:from-green-600 hover:to-emerald-700"
                  disabled={basicCompleted}
                >
                  {basicCompleted ? "Verified" : "Submit Basic Verification"}
                </button>
              </form>
            </div>
          </div>
        )}

        {level === "advanced" && (
          <div className="border-2 rounded-2xl bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-2xl p-5">
              <h3 className="text-2xl font-semibold">Advanced Verification Form</h3>
              <p className="text-purple-50 text-sm">Upload required documents for full verification</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleAdvancedSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Address Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Street Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        Country
                      </label>
                      <input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="postalCode" className="text-sm font-medium">
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Document Uploads</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="idFront" className="text-sm font-medium">
                        ID Front
                      </label>
                      <input
                        id="idFront"
                        type="file"
                        onChange={handleFileUpload("idFront")}
                        accept="image/*"
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="idBack" className="text-sm font-medium">
                        ID Back
                      </label>
                      <input
                        id="idBack"
                        type="file"
                        onChange={handleFileUpload("idBack")}
                        accept="image/*"
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="selfie" className="text-sm font-medium">
                        Selfie with ID
                      </label>
                      <input
                        id="selfie"
                        type="file"
                        onChange={handleFileUpload("selfie")}
                        accept="image/*"
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="proofOfAddress" className="text-sm font-medium">
                        Proof of Address
                      </label>
                      <input
                        id="proofOfAddress"
                        type="file"
                        onChange={handleFileUpload("proofOfAddress")}
                        accept="image/*,application/pdf"
                        className="border-2 rounded-lg px-3 py-2 w-full dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/50 hover:from-purple-600 hover:to-pink-700"
                  disabled={advancedCompleted}
                >
                  {advancedCompleted ? "Verified" : "Submit Advanced Verification"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Verification;
