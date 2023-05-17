import React from "react";
import firebase from "firebase/compat/app";
import Button from "@mui/material/Button";
import {auth} from "../firebase"

const Login = () => {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="text-zinc-200 flex flex-col justify-center items-center min-h-screen">
      <h3 className="text-4xl font-semibold">Unleash your creativity, remember every moment</h3>
      <p className="mt-3 mb-10"> The all-in-one app for notes and journaling </p>
      <Button 
          onClick={signInWithGoogle}
          variant="outlined"
          color="warning"
          sx={{ width: 300, padding: 1.5}}
      >
        Login with Google Account
      </Button>
    </div>
  )
}
export default Login