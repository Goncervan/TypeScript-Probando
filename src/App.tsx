import React, { useState, useRef } from 'react';
import './App.css'
type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}


function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>("")
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  return (
    <div className="principal">
      <div className="container p-4">
        <div className="row">
          <div className="col-md6">
            <div className="card">
              <div className="card-body div-form">
                <h1 className="text-center">Mi primera app con TypeScript</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    ref={taskInput}
                    className="form-control"
                    type="text"
                    placeholder="Nueva tarea"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    autoFocus
                  />
                  <button className="btn w-100 btn-outline-dark mt-2">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
            {
              tasks.map((t: ITask, i: number) => {
                return (
                  <div key={i} className="card text-center card-body mt-2">
                    <h1 className="title" style={{ textDecoration: t.done ? "line-through" : "" }}>{t.name}</h1>
                    <div className="btns text-center">
                      <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                        {t.done ? "✓" : "✗"}
                      </button>
                      <button className="btn btn-danger" onClick={() => removeTask(i)}>
                        🗑
                      </button>
                    </div>
                  </div>)
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
