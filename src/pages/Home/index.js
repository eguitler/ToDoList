import React, { useState } from "react";
import styled from "@emotion/styled";
import _ from "underscore";
import Task from "../../components/Task";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TasksListStyled = styled.div`
    border: 1px solid;
    width: 90%;
    max-width: 400px;
`;

const Home = () => {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [showDoneTasks, setShowDoneTasks] = useState(true);

    const [taskPosition, setTaskPosition] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        const newTask = {
            id: _.uniqueId("task-"),
            description: e.target.task.value,
            position: taskPosition,
        };
        setPendingTasks([...pendingTasks, newTask]);
        setTaskPosition(taskPosition + 1);
        e.target.task.value = ""
    }

    function handleTaskCheck(e) {
        const markAsDone = e.target.checked;
        const id = e.target.attributes.taskid.value;

        if (markAsDone) {
            const task = pendingTasks.find((task) => task.id === id);
            setDoneTasks([...doneTasks, task]);
            const newList = pendingTasks.filter((task) => task.id !== id);
            setPendingTasks([...newList]);
        } else {
            const task = doneTasks.find((task) => task.id === id);

            const pendingList = _.sortBy([...pendingTasks, task], "position");
            setPendingTasks([...pendingList]);
            const newList = doneTasks.filter((task) => task.id !== id);
            setDoneTasks([...newList]);
        }
    }

    return (
        <Container>
            <h1>Lista de Tareas</h1>
            <button onClick={() => setShowDoneTasks(!showDoneTasks)}>
                {`${showDoneTasks ? "Ocultar" : "Mostrar"} completadas`}
            </button>
            <form onSubmit={handleSubmit}>
                <input name="task" placeholder="Nueva Tarea" />
                <button>Agregar</button>
            </form>
            <br />

            <TasksListStyled>
                <div>
                    <h3>PENDING</h3>
                    {[...pendingTasks].reverse().map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onCheck={handleTaskCheck}
                        />
                    ))}
                    <br />
                </div>
                {showDoneTasks && (
                    <div>
                        <h3>DONE</h3>
                        {[...doneTasks].reverse().map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                checked={true}
                                onCheck={handleTaskCheck}
                            />
                        ))}
                    </div>
                )}
            </TasksListStyled>
        </Container>
    );
};

export default Home;
