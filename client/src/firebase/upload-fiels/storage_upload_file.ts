import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHOBiXR_gnkaqRAJLKx0rsyePN73hMQ3s",
  authDomain: "photo-456c7.firebaseapp.com",
  projectId: "photo-456c7",
  storageBucket: "photo-456c7.appspot.com",
  messagingSenderId: "771122109648",
  appId: "1:771122109648:web:525b3116362df6831692d5",
  measurementId: "G-6443GW15JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

export const upload=async (file:File)=>{
  // console.log("file",file);
  const path=`images/${file.name}`;
  const storageRef = ref(storage, path);
  const metadata = {
    contentType: 'image/jpeg',
  };
    // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file, metadata);
  return await  getDownloadURL(ref(storage, path)); 
}



// export const download=async(path:string):Promise<string>=>{
//   const url= await  getDownloadURL(ref(storage, path)); 
//   console.log(url);
//  return url;
// } 