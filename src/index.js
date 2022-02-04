import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
const auth = getAuth();
// collection ref
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,
  where("author", "==", "Reem"),
  orderBy("createdAt", "asc")
);

// *************************************************

// // get collection data
// يعني بيجيب الداتا , بس لو ضفت او حذفت لازم اعمل ريفرش
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => console.log(err));

// *************************************************
// To get query data
onSnapshot(q, (snapshot) => {
  // get real time collection data
  //  onSnapshot(colRef, (snapshot) => {
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
    createdAt: serverTimestamp(),
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

// get a single document
const docRef = doc(db, "books", "ruELmw3ZoilupgCPsSeT");

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// Update book
const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateBookForm.bookId.value);
  updateDoc(docRef, {
    title: "updated book",
  }).then(() => {
    updateBookForm.reset();
    alert("updated successfully");
  });
});

// Signup
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created", cred.user);
      signupForm.reset();
      alert("sign up successfully");
    })
    .catch((err) => console.log(err));
});

/* Login  */
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

/* Logout */
const logoutButton = document.getElementById("logout");
logoutButton.style.color="#000"
logoutButton.addEventListener("click", () => {
  console.log('clicked')
/*   signOut(auth)
    .then(() => {
      console.log("user signed out");
    })
    .catch((err) => {
      console.log(err.message);
    }); */
});
