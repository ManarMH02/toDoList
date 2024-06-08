import { ChangeEvent, useState, useEffect } from "react"
import { MdDelete } from "react-icons/md";

function App() {
  interface Itask {
    name: string,
    id: number
  }

  const [tasksList, setTasksList] = useState<Itask[]>(JSON.parse(localStorage.getItem('tasks')!) || []);
  const [newTask, setNewTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<number[]>(JSON.parse(localStorage.getItem('completed')!) || [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksList))
    localStorage.setItem('completed', JSON.stringify(completedTasks))
  }, [tasksList, completedTasks])

  const handelInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(event.target.value)
  }
  const AddTask = (): void => {
    if (newTask.trim() !== "") {
      setTasksList(t => [...t, { name: newTask, id: Date.now() }]);
      setNewTask("");
    }
  }
  const deleteTask = (ClickedId: number): void => {
    setTasksList(t => t.filter(task => task.id !== ClickedId))
  }
  const completeTask = (clickedId: number): void => {
    setCompletedTasks(c =>
      c.includes(clickedId) ?
        c.filter(i => i != clickedId) :
        [...c, clickedId]
    )
  }
  return (
    <>
      <div
        className="container max-w-md mt-12 mx-auto text-center rounded-md p-4  bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-50 drop-shadow-lg"
      >
        <h1
          className=" text-5xl mb-5"
        >
          To Do List
        </h1>
        <div
          className="mb-7"
        >
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={handelInputChange}
            className="w-9/12 p-2 rounded-md border-none outline-none text-slate-800"
          />
          <button
            onClick={AddTask}
            className="py-2 px-3 bg-white text-indigo-500 rounded-md ml-1"
          >
            Add
          </button>
        </div>
        <ul
          className="w-11/12 mx-auto"
        >
          {
            tasksList.map(task => (
              <li
                key={task.id}
                className="flex items-center p-2 bg-white mb-3 rounded-md text-gray-700"
              >
                <span
                  onClick={() => completeTask(task.id)}
                  className={`flex-1 text-start text-base cursor-pointer ${completedTasks.includes(task.id) ? "line-through text-indigo-500 " : ""}`}>
                  {task.name}
                </span>
                <button
                  className=" w-6 h-6 rounded-full bg-indigo-500 hover:bg-red-500 transition-all duration-300 text-white flex justify-center items-center ml-1"
                  onClick={() => deleteTask(task.id)}
                >
                  <MdDelete />
                </button>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="instructions mx-auto max-w-md p-5 text-sm leading-loose text-sky-600 ">
                <p>
          <b>Welcome to your To-Do List! <br />
            Here&apos;s how to use it:</b>
                    <br />
                    1. Add tasks by typing in the input box and clicking &apos;Add&apos;.
                    <br />
                    2. Click on a task to mark it as completed.
                    <br />
                    3. Remove a task by clicking the delete button.
                    <br />
                    Stay organized and get things done!
                </p>
            </div>
    </>
  )
}

export default App
