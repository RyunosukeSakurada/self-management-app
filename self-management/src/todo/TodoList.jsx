import React, { useEffect, useState } from "react"
import {BiTrash} from "react-icons/bi"
import {FiEdit} from "react-icons/fi"
import {db} from "../firebase";


const style = {
  li:'md:flex justify-between mb-5 p-2 bg-zinc-600 rounded break-all',
  liCompleted:'flex justify-between mb-5 p-2 bg-zinc-800 rounded break-all',
  text:'cursor-pointer break-all',
  textCompleted:'cursor-pointer line-through break-all'
}


const TodoList = () => {
  const [todos, setTodos] = useState([])

  //read todo from firebase
  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });
  }, []);


  //delete todo from firebase
  const handleDeleteTodo = (id) => {
    db.collection("todos").doc(id).delete()
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };


  //toggle status of "completed"

  const handleCheckboxChange = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const updatedCompleted = !todo.data.completed;

        db.collection("todos").doc(id).update({
          completed: updatedCompleted,
        })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });

        return {
          ...todo,
          data: {
            ...todo.data,
            completed: updatedCompleted,
          },
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };



  return (
    <div>
      <span>You have {todos.length} todos</span>
      <ul className="mt-3">
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            data-id={todo.id}
            className={todo.data.completed ? style.liCompleted : style.li}
          >
            <div className="flex items-center gap-x-1 ">
              <input 
                type="checkbox" 
                checked={todo.data.completed ? 'checked' : ''} 
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <p 
                className={todo.data.completed ? style.textCompleted : style.text}
              >
                {todo.data.text}
              </p>
            </div>
            <div className="flex items-center gap-x-1">
              <FiEdit />
              <BiTrash onClick={() => handleDeleteTodo(todo.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TodoList