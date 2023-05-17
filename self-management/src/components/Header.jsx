import { Button } from "@mui/material"
import React from "react"
import { auth } from "../firebase";

const Header = () => {
  return (
    <header className="mb-8 bg-zinc-900 text-zinc-200">
      <div className="flex items-center justify-between max-w-[900px] mx-auto py-4 px-2">
        <h1 className="text-2xl">Management</h1>
        <Button
          onClick={() => auth.signOut()}
          variant="outlined"
          color="warning"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
export default Header