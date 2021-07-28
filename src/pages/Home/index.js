import React, { useState } from "react";
import styled from "@emotion/styled";
import _ from "underscore";
import TasksList from "components/TasksList";
import Form from "components/Form";
import Button from "components/Button";
import {
    addToDone,
    addToPending,
    removeFromDone,
    removeFromPending,
} from "taskReducers";
import { connect } from "react-redux";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 400px;
    border: 1px solid;
    margin: 0 auto;
    gap: 50px;
`;

const TasksListStyled = styled.div`
    width: 100%;
    border: 1px solid;
`;

const Home = ({
    newPosition,
    doneTasks,
    pendingTasks,
    addToDone,
    addToPending,
    removeFromDone,
    removeFromPending,
}) => {
    const [showDoneTasks, setShowDoneTasks] = useState(true);

    function createNewTask(e) {
        e.preventDefault();
        const newTask = {
            id: _.uniqueId("task-"),
            description: e.target.task.value,
            position: newPosition,
            checked: false,
        };
        addToPending(newTask);
        e.target.task.value = "";
    }

    function moveTaskToDone(e) {
        const id = e.target.attributes.taskid.value;

        const task = pendingTasks.find((task) => task.id === id);
        task.checked = true;

        addToDone(task);
        removeFromPending(task.id);
    }

    function moveTaskToPending(e) {
        const id = e.target.attributes.taskid.value;

        const task = doneTasks.find((task) => task.id === id);
        task.checked = false;

        addToPending(task);
        removeFromDone(task.id);
    }

    return (
        <Container>
            <div>
                <h1>Lista de Tareas</h1>
                <Button
                    text={`${
                        showDoneTasks ? "Ocultar" : "Mostrar"
                    } completadas`}
                    onClick={() => setShowDoneTasks(!showDoneTasks)}
                />
                <Form handleSubmit={createNewTask} />
            </div>

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

const mapStateToProps = (state) => {
    return {
        doneTasks: state.doneTasks,
        pendingTasks: state.pendingTasks,
        newPosition: state.positionTask,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToPending: (newTask) => dispatch(addToPending(newTask)),
        removeFromPending: (taskId) => dispatch(removeFromPending(taskId)),
        addToDone: (newTask) => dispatch(addToDone(newTask)),
        removeFromDone: (taskId) => dispatch(removeFromDone(taskId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
