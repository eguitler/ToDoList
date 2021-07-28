import React from "react";
import styled from "@emotion/styled";

import Task from "../Task";

const Container = styled.article`
    border: 1px solid rgba(1,1,1, .1);
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(1,1,1, .3);
    padding: 10px 20px;

    .divider {
        height: 1px;
        border-bottom: 1px solid rgba(1,1,1, .2);
        margin: 5px 0;
    }

    .empty-msg {
        color: rgba(1,1,1, .5);
    }
`;

const TasksList = ({ title, tasks, onCheck }) => {
    return (
        <Container>
            <h3>{title}</h3>
            <div className="divider" />
            {tasks.length === 0 ? (
                <span className="empty-msg">No tienes tareas en esta lista</span>
            ) : (
                [...tasks].reverse().map((task) => {
                    return (
                        <Task
                            key={task.id}
                            task={task}
                            checked={task.checked}
                            onCheck={onCheck}
                        />
                    );
                })
            )}
            <br />
        </Container>
    );
};

export default TasksList;
