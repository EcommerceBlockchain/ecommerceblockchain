import {
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const getUsernameByEmail = async (email) => {
  let username = "";
  let qu = query(
    collection(getFirestore(), "users"),
    where("email", "==", email)
  );
  const doc = await getDocs(qu);
  doc.docs.forEach((item) => {
    username = item.id;
  });
  return username;
};

export default getUsernameByEmail;
