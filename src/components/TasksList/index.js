import React from "react";
import Task from "components/Task";
import { TasksListStyled } from "./styles";

const TasksList = ({ title, tasks, onCheck }) => {
    return (
        <TasksListStyled data-testid={`${title.toLowerCase()}-tasks-list`}>
            <h3>{title}</h3>
            <div className="divider" />
            {tasks.length === 0 ? (
                <span className="empty-msg">
                    No tienes tareas en esta lista
                </span>
            ) : (
                [...tasks].reverse().map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            checked={task.checked} // remove this
                            onCheck={onCheck}
                        />
                    );
                })
            )}
            <br />
        </TasksListStyled>
    );
};

export default TasksList;
