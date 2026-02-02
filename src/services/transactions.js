import { collection, doc, getDoc, getDocs, addDoc, setDoc, query } from "firebase/firestore";
import { db } from "../firebase-config";

export const getUserProfile = async (email) => {
  if (!email) return null;
  const docRef = doc(db, "Users", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const fetchDeposits = async (email) => {
  if (!email) return { deposits: [], total: 0 };
  const q = query(collection(db, "Users", email, "Deposits"));
  const querySnapshot = await getDocs(q);
  const deposits = [];
  let total = 0;
  querySnapshot.forEach((snapshot) => {
    const data = snapshot.data();
    deposits.push({ ...data, id: snapshot.id });
    total += parseFloat(data.amount || 0);
  });
  return { deposits, total };
};

export const createDeposit = async ({ email, values, imageUrl }) => {
  const depositRef = doc(collection(db, "Users", email, "Deposits"));
  await setDoc(depositRef, {
    profit: values.profit,
    amount: values.amount,
    method: values.method,
    date: values.date,
    uid: values.uid,
    imageUrl: imageUrl || "",
  });
  return depositRef.id;
};

export const fetchWithdrawals = async (email) => {
  if (!email) return [];
  const withdrawalCollection = collection(db, "Users", email, "Withdrawals");
  const withdrawalSnapshot = await getDocs(withdrawalCollection);
  return withdrawalSnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));
};

export const createWithdrawal = async ({ email, data }) => {
  const docRef = await addDoc(collection(db, "Users", email, "Withdrawals"), data);
  return { id: docRef.id, ...data };
};
