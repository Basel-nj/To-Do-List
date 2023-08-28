import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import darkIcon from "./asset/images/moon-dark-theme-svgrepo-com.png";
import lightIcon from "./asset/images/sun-light-theme-svgrepo-com.png";
import lightImage from "./asset/images/bg-desktop-light.jpg";
import darkImage from "./asset/images/bg-desktop-dark.jpg";
import Task from "./Task";
import { Fragment } from "react";

function App() {
   const lightTheme = {
      theme: "light",
      image: lightImage,
      icon: lightIcon,
      background: "white",
      mainbackground: "#e4e5f1",
      textColor: "#393a4c",
   };

   const darkTheme = {
      theme: "dark",

      image: darkImage,
      icon: darkIcon,
      background: "#181423",
      mainbackground: "#29203f",
      textColor: "#cacde8",
   };

   const [theme, setTheme] = useState(darkTheme);
   const [task, setTask] = useState("");
   const [allTasks, setAllTasks] = useState(() => {
      return JSON.parse(localStorage.getItem("tasks")) || [];
   });
   const [todos, setTodos] = useState(allTasks);
   const [navbar, setNavbar] = useState({
      all: true,
      active: false,
      completed: false,
   });

   const taskRef = useRef(null);

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      console.log("stored");
   }, [allTasks]);

   const changeTheme = () => {
      if (theme.theme === lightTheme.theme) {
         setTheme(darkTheme);
      } else {
         setTheme(lightTheme);
      }
   };

   const addTaskToActive = () => {
      setAllTasks((prev) => {
         return [...prev, { task: task, completed: false }];
      });
      taskRef.current.value = "";
   };

   const deleteCallback = (deletedTask) => {
      setAllTasks(
         allTasks.filter((activeTask) => activeTask.task !== deletedTask.task)
      );
   };

   const completedCallBack = (doneTask) => {
      setAllTasks(
         allTasks.map((active) => {
            if (active.task === doneTask.task) {
               return { ...active, completed: doneTask.completed };
            } else {
               return active;
            }
         })
      );
   };

   const filterHandling = (type) => {
      if (type === "all") {
         setNavbar(() => {
            return {
               all: true,
               active: false,
               completed: false,
            };
         });
      } else if (type === "completed") {
         setNavbar(() => {
            return {
               all: false,
               active: false,
               completed: true,
            };
         });
         setTodos([]);
         allTasks.map((task) => {
            if (task.completed) {
               setTodos((prev) => {
                  return [...prev, task];
               });
            }
         });
      } else if (type === "active") {
         setNavbar(() => {
            return {
               all: false,
               active: true,
               completed: false,
            };
         });
         setTodos([]);
         allTasks.map((task) => {
            if (!task.completed) {
               setTodos((prev) => {
                  return [...prev, task];
               });
            }
         });
      }
   };

   const countTasks = () => {
      if (navbar.all) {
         return allTasks.length;
      } else {
         return todos.length;
      }
   };

   const clickHandler = (type) => {
      if (type === "all") {
         setAllTasks([]);
         setTodos(todos.filter((task) => task.completed));
      } else if (type === "completed") {
         setAllTasks(allTasks.filter((task) => !task.completed));
         setTodos(todos.filter((task) => !task.completed));
      }
   };
   return (
      <div className="app">
         <div
            className="header"
            style={{ backgroundImage: `url(${theme.image})` }}
         >
            <div className="text">
               <p>TO DO</p>
               <p>Tips:</p>
               <ul>
                  <li>Click To Mark As Completed</li>
                  <li>Drag And Drop To Rearrange</li>
               </ul>
               <div className="theme">
                  <img src={theme.icon} alt="" onClick={changeTheme} />
                  <span>Theme</span>
               </div>
            </div>
         </div>
         <div
            className="main-content"
            style={{
               backgroundColor: `${theme.background}`,
            }}
         >
            <div className="to-do-list">
               <div className="adding">
                  <input
                     type="text"
                     placeholder="Create a new task..."
                     className="input-to-do"
                     style={{
                        backgroundColor: `${theme.mainbackground}`,
                        color: `${theme.textColor}`,
                     }}
                     onChange={(e) => setTask(e.target.value)}
                     ref={taskRef}
                  />
                  <button
                     className="add"
                     style={{
                        backgroundColor: `${theme.mainbackground}`,
                        color: `${theme.textColor}`,
                     }}
                     onClick={addTaskToActive}
                  >
                     Add
                  </button>
               </div>
               <div className="list">
                  {navbar.all
                     ? allTasks.map((active) => {
                          return (
                             <Task
                                theme={theme}
                                task={active}
                                deleteCallback={deleteCallback}
                                completedCallBack={completedCallBack}
                                showConfig={navbar.all}
                             />
                          );
                       })
                     : todos.map((active) => {
                          return (
                             <Task
                                theme={theme}
                                task={active}
                                deleteCallback={deleteCallback}
                                completedCallBack={completedCallBack}
                             />
                          );
                       })}

                  <div
                     className="navbar"
                     style={{
                        backgroundColor: `${theme.mainbackground}`,
                        color: `${theme.textColor}`,
                     }}
                  >
                     {allTasks.length !== 0 && (
                        <Fragment>
                           <div className="main-navbar">
                              {" "}
                              <span
                                 className={navbar.all && "activ-navbar"}
                                 onClick={() => filterHandling("all")}
                              >
                                 All
                              </span>
                              <span
                                 className={navbar.active && "activ-navbar"}
                                 onClick={() => filterHandling("active")}
                              >
                                 Active
                              </span>
                              <span
                                 className={navbar.completed && "activ-navbar"}
                                 onClick={() => filterHandling("completed")}
                              >
                                 Completed
                              </span>
                           </div>
                           <div className="secondary-navbar">
                              {" "}
                              <span onClick={() => clickHandler("completed")}>
                                 Clear Completed
                              </span>
                              <span onClick={() => clickHandler("all")}>
                                 Clear All
                              </span>
                              <span> {countTasks()} item count</span>
                           </div>
                        </Fragment>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
export default App;
