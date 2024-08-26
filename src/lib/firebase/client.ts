"use client";

import type { FirebaseStorage } from "firebase/storage";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseClientApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseClientApp) as Auth;
const firebaseFirestore = getFirestore(firebaseClientApp) as Firestore;
const firebaseStorage = getStorage(firebaseClientApp) as FirebaseStorage;

export { firebaseAuth, firebaseFirestore, firebaseStorage };
