// src/firebase.js
import { initializeApp } from "firebase/app";                           // 앱 초기화 :contentReference[oaicite:0]{index=0}
import { getAnalytics } from "firebase/analytics";                      // 선택적 Analytics
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "firebase/auth";                                                // 인증 모듈 + 익명 로그인 :contentReference[oaicite:1]{index=1}
import { getFirestore } from "firebase/firestore";                      // Firestore 모듈
import { getStorage } from "firebase/storage";                          // Storage 모듈 :contentReference[oaicite:2]{index=2}

import firebaseConfig from "./firebaseConfig";                          // 설정 객체

// 1) Firebase App 인스턴스
const app = initializeApp(firebaseConfig);

// 2) 선택 모듈 인스턴스
const analytics = getAnalytics(app);
const auth = getAuth(app);

// 3) 익명 인증 (Anonymous Auth)
//    인증된 사용자(request.auth != null)로 처리되어 Storage 업로드 권한 통과
signInAnonymously(auth)
  .then(() => console.log("Anonymous sign-in successful"))
  .catch((error) => console.error("Anonymous sign-in failed", error));  

// 4) 인증 상태 변경 리스너 (optional)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in with UID:", user.uid);
  } else {
    console.log("User signed out");
  }
});

const db = getFirestore(app);
const storage = getStorage(app);

// 5) 외부 사용을 위해 export
export { app, analytics, auth, db, storage };
export default app;
