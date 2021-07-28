import React, { useState } from "react";
import styled from "@emotion/styled";
import _ from "underscore";
import TasksList from "components/TasksList";
import Form from "components/Form";
import Button from "components/Button";

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

    function createNewTask(e) {
        e.preventDefault();
        const newTask = {
            id: _.uniqueId("task-"),
            description: e.target.task.value,
            position: taskPosition,
            checked: false,
        };
        setPendingTasks([...pendingTasks, newTask]);
        setTaskPosition(taskPosition + 1);
        e.target.task.value = "";
    }

    function moveTaskToDone(e) {
        const id = e.target.attributes.taskid.value;

        const task = pendingTasks.find((task) => task.id === id);
        task.checked = true;
        setDoneTasks([...doneTasks, task]);

        const newPendingList = pendingTasks.filter((task) => task.id !== id);
        setPendingTasks([...newPendingList]);
    }

    function moveTaskToPending(e) {
        const id = e.target.attributes.taskid.value;

        const task = doneTasks.find((task) => task.id === id);
        task.checked = false;

        const newPendingList = _.sortBy([...pendingTasks, task], "position");
        setPendingTasks([...newPendingList]);

        const newDoneList = doneTasks.filter((task) => task.id !== id);
        setDoneTasks([...newDoneList]);
    }

    return (
        <Container>
            <h1>Lista de Tareas</h1>
            <Button
                text={`${showDoneTasks ? "Ocultar" : "Mostrar"} completadas`}
                onClick={() => setShowDoneTasks(!showDoneTasks)}
            />
            <Form handleSubmit={createNewTask} />
            <br />

            <TasksListStyled>
                <TasksList
                    title="PENDING"
                    tasks={pendingTasks}
                    onCheck={moveTaskToDone}
                />
                {showDoneTasks && (
                    <TasksList
                        title="DONE"
                        tasks={doneTasks}
                        onCheck={moveTaskToPending}
                    />
                )}
            </TasksListStyled>
        </Container>
    );
};

export default Home;
