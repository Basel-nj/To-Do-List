import React, { useState } from "react";

function Task({ theme, task, deleteCallback, completedCallBack, showConfig }) {
   const [isTaskDone, setIsTaskDone] = useState(false);

   const taskeHandler = () => {
      setIsTaskDone(!isTaskDone);
      completedTask();
   };

   const deleteTask = () => {
      return deleteCallback(task);
   };

   const completedTask = () => {
      task.completed = !task.completed;
      return completedCallBack(task);
   };

   return (
      <div
         className="list-item"
         style={{
            backgroundColor: `${theme.mainbackground}`,
            color: `${theme.textColor}`,
         }}
      >
         {showConfig && (
            <span
               className={task.completed ? "check checked" : "check"}
               onClick={taskeHandler}
            ></span>
         )}

         <span
            className={task.completed && "done"}
            style={{ color: `${theme.textColor}` }}
         >
            {task.task}
         </span>

         {showConfig && <span className="delete" onClick={deleteTask}></span>}
      </div>
   );
}

export default Task;
