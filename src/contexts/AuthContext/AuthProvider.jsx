// @ts-nocheck
/* eslint-disable react-refresh/only-export-components */

// Import necessary modules
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword, // Firebase function to register a user
  onAuthStateChanged, // Firebase listener for auth state changes
  signInWithEmailAndPassword, // Firebase function to sign in with email/password
  signOut, // Firebase function to sign out
  GoogleAuthProvider, // Google auth provider
  signInWithPopup, // Firebase function to sign in using a popup
  updateProfile, // Firebase function to update user profile
} from "firebase/auth";
import { auth } from "../../firebase/firebase_init"; // Import initialized Firebase auth instance

// Create a context to provide authentication state and functions across the app
export const AuthContext = createContext();

// AuthProvider component that wraps the entire app and manages auth state
const AuthProvider = ({ children }) => {
  // State to store the current user
  const [user, setUser] = useState(null);

  // State to handle loading indicator
  const [loading, setLoading] = useState(true);

  // Set up a Firebase auth state listener when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
      setLoading(false); // Set loading to false once auth state is known
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true); // Set loading while registering
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in an existing user with email and password
  const signInUser = (email, password) => {
    setLoading(true); // Set loading while logging in
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out the currently logged-in user
  const signOutUser = () => {
    setLoading(true); // Set loading while signing out
    return signOut(auth);
  };

  // Sign in using Google popup
  const signInWithGoogle = () => {
    setLoading(true); // Set loading while logging in with Google
    const provider = new GoogleAuthProvider(); // Create Google provider instance
    return signInWithPopup(auth, provider); // Trigger popup
  };

  // Update the user's display name and photo
  const updateUserProfile = (name, photo) => {
    if (!auth.currentUser) {
      return Promise.reject("No user is signed in"); // Prevent update if no user
    }
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Object to provide all auth state and functions to context consumers
  const authInfo = {
    user, // Current user object
    loading, // Loading status
    createUser, // Register new user
    signInUser, // Login with email/password
    signOutUser, // Logout
    signInWithGoogle, // Login with Google
    updateUserProfile, // Update name/photo
  };

  // Provide the context to child components
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
