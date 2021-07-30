import React, { useState } from "react";
import { connect } from "react-redux";
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

import { HomeStyled } from "./styles";
import Footer from "Layout/Footer";

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

    function createNewTask(inputValue) {
        const newTask = {
            id: _.uniqueId("task-"),
            description: inputValue,
            position: newPosition,
            checked: false,
        };
        addToPending(newTask);
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
        <>
            <HomeStyled>
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
                        title="PENDIENTES"
                        tasks={pendingTasks}
                        onCheck={moveTaskToDone}
                    />
                    {showDoneTasks && (
                        <TasksList
                            title="FINALIZADAS"
                            tasks={doneTasks}
                            onCheck={moveTaskToPending}
                        />
                    )}
                </div>
            </HomeStyled>
            <Footer />
        </>
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
