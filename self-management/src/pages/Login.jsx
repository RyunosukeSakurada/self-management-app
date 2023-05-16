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
    <div>
      <h2>Self Management</h2>
      <Button 
          onClick={signInWithGoogle}
          variant="outlined"
          color="info"
          sx={{ width: 250, padding: 1.5}}
        >
            Login
        </Button>
    </div>
  )
}
export default Login