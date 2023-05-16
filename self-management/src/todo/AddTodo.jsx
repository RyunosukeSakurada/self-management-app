import React, { useState } from "react"
import {VscDiffAdded} from "react-icons/vsc"
import {db} from "../firebase";


function AddTodo(){
  const [text, setText] = useState("");

  //add todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    db.collection("todos")
      .add({
        text
      })
      .then(() => {
        setText("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <form 
      className="flex justify-between items-center mb-5"
      onSubmit={handleAddTodo}
    >
      <input 
        type="text"
        className="text-zinc-900 p-1 w-full rounded" 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>
        <VscDiffAdded className="text-4xl"/>
      </button>
    </form>
  )
}
export default AddTodo