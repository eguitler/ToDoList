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
    max-width: 500px;
    min-width: 250px;
    margin: 0 auto;
    gap: 30px;

    .title-wrapper {
        margin-top: 30px;
        font-size: 1rem;
        
        @media screen and (min-width: 480px) {
            font-size: 1.5rem;
        }
    }

    .btn-showdonetasks-wrapper {
        height: 45px;
    }

    .form-newtask-wrapper {
        width: 100%;
    }

    .lists-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
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
            <div className="title-wrapper">
                <h1>Lista de Tareas</h1>
            </div>
            <div className="btn-showdonetasks-wrapper">
                <Button
                    text={`${
                        showDoneTasks ? "Ocultar" : "Mostrar"
                    } completadas`}
                    onClick={() => setShowDoneTasks(!showDoneTasks)}
                />
            </div>
            <div className="form-newtask-wrapper">
                <Form
                    onSubmit={createNewTask}
                    inputName="task"
                    inputPlaceHolder="Nueva tarea"
                    textButton="Agregar"
                />
            </div>

            <div className="lists-wrapper">
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
            </div>
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
