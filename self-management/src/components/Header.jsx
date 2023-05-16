import { Button } from "@mui/material"
import React from "react"

const Header = () => {
  return (
    <header className="mb-8 bg-zinc-900">
      <div className="flex items-center justify-between max-w-[900px] mx-auto py-4 px-2">
        <h1 className="text-2xl">Management</h1>
        <Button
          variant="outlined"
          color="info"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
export default Header