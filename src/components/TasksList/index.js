import React from "react";
import Task from "../Task";

const TasksList = ({ title, tasks, onCheck }) => {
    console.log(tasks);
    return (
        <div>
            <h3>{title}</h3>
            {[...tasks].reverse().map((task) => {
                console.log(task);
                return (
                    <Task
                        key={task.id}
                        task={task}
                        checked={task.checked}
                        onCheck={onCheck}
                    />
                );
            })}
            <br />
        </div>
    );
};

export default TasksList;
