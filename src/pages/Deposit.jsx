import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import Footer from "./Footer";
import FileUpload from "../components/FileUpload.jsx";
import { setDoc, doc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-config.js";
import axios from "axios"

const Deposit = () => {
  const [formValues, setFormValues] = useState({
    profit: '',
    amount: '',
    method: 'Bitcoin', // default value
    date: new Date().toISOString().split('T')[0], // default to current date
  });
  const [image, setImage] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // State variable for total deposit amount

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "slhqrxii");
   await axios.post("https://api.cloudinary.com/v1_1/dpr64v1lo/image/upload", formData)

    const user = auth.currentUser;
    if (user) {
      try {
        const depositRef = doc(collection(db, "Users", user.email, "Deposits"));
        await setDoc(depositRef, {
          profit: formValues.profit,
          amount: formValues.amount,
          method: formValues.method,
          date: formValues.date,
          uid: user.uid,
        });
        toast.success("Successfully saved");
        fetchDeposits(); // Fetch deposits again after successful submission
      } catch (error) {
        toast.error("Invalid input. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('No user is authenticated.');
      setLoading(false);
    }
  };

  const fetchDeposits = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(collection(db, "Users", user.email, "Deposits"));
      const querySnapshot = await getDocs(q);
      const userDeposits = [];
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userDeposits.push({ ...data, id: doc.id });
        total += (parseFloat(data.amount)); // Sum the amounts
      });
      setDeposits(userDeposits);
      setTotalAmount(total); // Update total amount
      sessionStorage.setItem('totalAmount', total); // Store totalAmount in session storage
    }
  };
  
  useEffect(() => {
    fetchDeposits();
  }, []);
  
  return (
    <section className="bg-[#f4f7fe]">
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/2 mx-[7px] lg:mx-[30px] px-[10px]">
          <div className="flex flex-col gap-[20px] rounded-lg bg-[#fff] p-[15px] lg:p-[30px] my-[30px] shadow-outline-white shadow-md border">
            <div className="px-[15px] lg:px-[30px] text-[16px] lg:text-[20px] font-semibold py-[10px] lg:py-[15px]">
              <h4>Choose method</h4>
            </div>
            <div>
              <Accordion />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-[#fff] p-[15px] lg:p-[30px] rounded-lg shadow-outline-white shadow-md border mx-[15px] lg:mx-[30px]">
          <div className="w-full text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] px-[15px] lg:px-[30px] py-[10px] lg:py-[15px] font-semibold">
            <h4>Submit payment slip</h4>
          </div>
          <div className="text-[14px]">
            <p className="mb-[16px]">
              To deposit, choose the payment method panel and make the payment
              to the displayed address. After payment has been made, come back
              to fill this form.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-[5px] border-gray-700">
                <label>Select a payment method</label>
                <select
                  name="method"
                  id="paymentMethod"
                  value={formValues.method}
                  onChange={handleInputChange}
                  className="h-[35px] px-[10px] text-[grey]"
                >
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
              <div className="grid gap-[5px]">
                <label htmlFor="amount">Amount (Fiat)</label>
                <input
                  type="text"
                  placeholder="$0.00"
                  name="amount"
                  id="amount"
                  required
                  value={formValues.amount}
                  onChange={handleInputChange}
                  className="px-[12px] border-gray-800 h-[35px]"
                />
              </div>
              <div className="hidden gap-[5px]">
                <label htmlFor="amount">Amount (Fiat)</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  name="amount"
                  id="amount"
                  value={formValues.profit}
                  onChange={handleInputChange}
                  className="px-[12px] border-gray-800 h-[35px]"
                />
              </div>
              <div>
                <FileUpload handleFileChange={handleFileChange} />
              </div>
              <button
                type="submit"
                className="bg-[#3454f5] hover:bg-[#3454f5ab] text-[16px] text-white px-[23px] py-[5px] rounded mt-[20px]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit for review"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] mx-[15px] lg:mx-[35px] my-[30px] rounded-lg shadow-outline-white shadow-md border">
        <div className="w-full text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] px-[15px] lg:px-[30px] py-[10px] lg:py-[15px] font-semibold">
          <h4>Deposit Transactions</h4>
        </div>
        <div className="px-[15px] lg:px-[30px]">
          <div className="flex flex-wrap justify-between mb-[15px] lg:mb-[30px]">
            <div className="flex items-center mb-[10px] lg:mb-0">
              <label>
                Show
                <select className="mx-[5px]">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>entries</span>
              </label>
            </div>
            <div className="flex items-center">
              <label>
                Search:
                <input type="search" name="" id="" className="ml-[5px]" />
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#9ca3af] border-b-[1px] border-[#e4e6ef]">
                  <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">Transaction ID</th>
                  <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">Amount</th>
                  <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">Date</th>
                  <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">Method</th>
                  <th className="py-[10px] lg:py-[15px] text-[14px] font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {deposits.length > 0 ? (
                  deposits.map((deposit) => (
                    <tr key={deposit.id}>
                      <td className="py-[10px] lg:py-[15px]">{deposit.id}</td>
                      <td className="py-[10px] lg:py-[15px]">{deposit.amount}</td>
                      <td className="py-[10px] lg:py-[15px] whitespace-nowrap">{deposit.date}</td>
                      <td className="py-[10px] lg:py-[15px]">{deposit.method}</td>
                      <td className="py-[10px] lg:py-[15px]">{deposit.imageUrl !== "" ? "Approved" : "Pending"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center px-[30px] py-[30px]" colSpan="5">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4">
              <strong>Total Amount: ${totalAmount.toFixed(2)}</strong> {/* Display total amount */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Deposit;
