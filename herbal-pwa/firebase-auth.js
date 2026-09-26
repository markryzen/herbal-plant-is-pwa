/* ============================================================
   FIREBASE AUTH MODULE — Herbal Plant Identification PWA
   ============================================================
   PARA SAAN ITO:
   Nagbibigay ito ng Sign Up, Login, at Logout gamit ang Firebase
   Authentication, kasabay ng pag-save ng user profile sa
   Firestore ("users" collection).

   -------------------------------------------------------------
   PAANO I-SETUP (3 hakbang lang):
   -------------------------------------------------------------

   HAKBANG 1 — I-save ang file na ito
   Ilagay ang file na ito sa loob ng "herbal-pwa" folder mo,
   halimbawa:  herbal-pwa/firebase-auth.js

   HAKBANG 2 — Palitan ang firebaseConfig sa baba (line ~40)
   Kunin mo ang config na ito mula sa Firebase Console:
   Project Settings > General > "Your apps" > SDK setup and config
   Kung mayroon ka nang existing firebase-config.js sa project mo,
   COPY-PASTE mo lang yung laman niyon papunta dito (o i-delete
   yung duplicate initializeApp sa ibang file mo para walang
   conflict).

   HAKBANG 3 — I-link sa iyong HTML (index.html o login.html)
   Idagdag ang isang linya na ito bago mag-close ang </body>:

       <script type="module" src="firebase-auth.js"></script>

   Tapos gawan mo ng form ang HTML mo na ganito ang istruktura
   (pwede mong i-istilo/CSS gaya ng gusto mo, basta ang mga
   id="..." ay dapat eksaktong tugma):

       <!-- SIGN UP FORM -->
       <input type="email"    id="signup-email"    placeholder="Email">
       <input type="password" id="signup-password" placeholder="Password">
       <button id="signup-btn">Sign Up</button>
       <p id="signup-message"></p>

       <!-- LOGIN FORM -->
       <input type="email"    id="login-email"    placeholder="Email">
       <input type="password" id="login-password" placeholder="Password">
       <button id="login-btn">Login</button>
       <p id="login-message"></p>

       <!-- LOGOUT (ilagay sa dashboard/admin page) -->
       <button id="logout-btn">Logout</button>

   Tapos i-deploy gaya ng dati mo (git add, commit, push — kung
   naka-connect na sa Netlify, awtomatikong ma-de-deploy ito).
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ------------------------------------------------------------
// PALITAN ITO NG SARILI MONG FIREBASE CONFIG (mula sa Console)
// ------------------------------------------------------------
const firebaseConfig = {
  apiKey: "PALITAN_MO_ITO",
  authDomain: "PALITAN_MO_ITO.firebaseapp.com",
  projectId: "PALITAN_MO_ITO",
  storageBucket: "PALITAN_MO_ITO.appspot.com",
  messagingSenderId: "PALITAN_MO_ITO",
  appId: "PALITAN_MO_ITO"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------------------------------------------------
// SIGN UP — gumagawa ng bagong account + user profile sa Firestore
// ------------------------------------------------------------
async function handleSignUp(email, password) {
  const messageEl = document.getElementById("signup-message");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // I-save ang karagdagang info ng user sa Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user",          // baguhin sa "admin" kung admin account ang ginagawa
      createdAt: new Date().toISOString()
    });

    if (messageEl) {
      messageEl.style.color = "green";
      messageEl.textContent = "Account created! You can now log in.";
    }
    console.log("User created:", user.uid);
  } catch (error) {
    if (messageEl) {
      messageEl.style.color = "red";
      messageEl.textContent = translateFirebaseError(error.code);
    }
    console.error("Sign up error:", error.code, error.message);
  }
}

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------
async function handleLogin(email, password) {
  const messageEl = document.getElementById("login-message");
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Kunin ang role ng user mula sa Firestore (para malaman kung admin o user)
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.exists() ? userDoc.data().role : "user";

    if (messageEl) {
      messageEl.style.color = "green";
      messageEl.textContent = "Logged in successfully!";
    }
    console.log("Logged in as:", user.email, "| role:", role);

    // OPTIONAL: i-redirect papunta sa admin dashboard kung admin
    // if (role === "admin") { window.location.href = "admin.html"; }
    // else { window.location.href = "dashboard.html"; }

  } catch (error) {
    if (messageEl) {
      messageEl.style.color = "red";
      messageEl.textContent = translateFirebaseError(error.code);
    }
    console.error("Login error:", error.code, error.message);
  }
}

// ------------------------------------------------------------
// LOGOUT
// ------------------------------------------------------------
async function handleLogout() {
  try {
    await signOut(auth);
    console.log("Logged out.");
    window.location.href = "index.html"; // baguhin sa tamang landing page mo
  } catch (error) {
    console.error("Logout error:", error.code, error.message);
  }
}

// ------------------------------------------------------------
// I-tsek kung naka-login na ang user (tawagin ito sa protected pages)
// ------------------------------------------------------------
function watchAuthState(onLoggedIn, onLoggedOut) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (onLoggedIn) onLoggedIn(user);
    } else {
      if (onLoggedOut) onLoggedOut();
    }
  });
}

// ------------------------------------------------------------
// Mas madaling maintindihan na error messages (Tagalog)
// ------------------------------------------------------------
function translateFirebaseError(code) {
  const messages = {
    "auth/email-already-in-use": "Ginagamit na ang email na ito.",
    "auth/invalid-email": "Hindi valid ang format ng email.",
    "auth/weak-password": "Dapat hindi bababa sa 6 characters ang password.",
    "auth/user-not-found": "Walang account na naka-register sa email na ito.",
    "auth/wrong-password": "Maling password.",
    "auth/invalid-credential": "Maling email o password.",
    "auth/too-many-requests": "Sobrang dami ng maling attempt. Subukan ulit mamaya."
  };
  return messages[code] || "May naganap na error. Subukan ulit.";
}

// ------------------------------------------------------------
// I-connect ang mga function sa buttons (kapag na-load na ang page)
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-btn");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      handleSignUp(email, password);
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      handleLogin(email, password);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
});

// I-export kung sakaling kailangan mo tawagin ito mula sa ibang script
export { handleSignUp, handleLogin, handleLogout, watchAuthState };
