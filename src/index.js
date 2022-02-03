import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkjBHSFHAzZ9sS6DUS-Aw2O1ll2v_H4jU",
  authDomain: "fir-9-9c9ac.firebaseapp.com",
  projectId: "fir-9-9c9ac",
  storageBucket: "fir-9-9c9ac.appspot.com",
  messagingSenderId: "293634412674",
  appId: "1:293634412674:web:47b6537e4f5a010472649b",
};
// init firebase
initializeApp(firebaseConfig);

//  init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// // get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => console.log(err));

// get real time collection data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// Add book
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    alert("New book added ");
    addBookForm.reset();
  });
});

// Delete book
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.bookId.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
    alert("deleted successfully");
  });
});
