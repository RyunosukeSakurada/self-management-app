import React from "react"
import AddTodo from "./AddTodo"
import TodoList from "./TodoList"

const TodoHome = () => {
  return (
    <div className="bg-zinc-900 lg:w-1/4 p-4 text-zinc-200">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl py-2">My Todo</h4>
      </div>
      <AddTodo />
      <TodoList />
    </div>
  )
}
export default TodoHome