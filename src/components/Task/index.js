import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { openEditForm, updateTaskDescription } from "taskReducers";
import Form from "components/Form";
import { Container, EditFormStyled, TaskStyled } from "./styles";


const Task = ({
    task,
    checked,
    onCheck,
    taskIdEditFormOpened,
    openEditForm,
    updateTaskDescription,
}) => {
    const [editFormIsMounted, setEditFormIsMounted] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const TASKSLISTS = {
        doneTasks: "doneTasks",
        pendingTasks: "pendingTasks",
    };

    function handleShowHideEditForm() {
        setEditFormIsMounted(!editFormIsMounted);
        openEditForm(!editFormIsMounted ? task.id : null);
        if (!showEditForm) {
            setShowEditForm(true);
        }
    }

    function updateDescription(newDescription) {
        updateTaskDescription({
            taskId: task.id,
            tasksList: task.checked
                ? TASKSLISTS.doneTasks
                : TASKSLISTS.pendingTasks,
            newDescription: newDescription,
        });
    }

    useEffect(() => {
        if (editFormIsMounted && taskIdEditFormOpened !== task.id)
            setEditFormIsMounted(false);
    }, [taskIdEditFormOpened]);
    return (
        <Container>
            <TaskStyled
                className={taskIdEditFormOpened === task.id ? "highlight" : ""}
            >
                <input
                    name="checkbox"
                    type="checkbox"
                    className="checkbox"
                    taskid={task.id}
                    defaultChecked={checked}
                    onClick={onCheck}
                />
                <p className={`description ${task.checked ? "done" : ""}`}>
                    {task.description}{" "}
                </p>
                <div
                    className="edit-icon-wrapper"
                    title="Editar tarea"
                    onClick={handleShowHideEditForm}
                >
                    <img src="/icons/edit.svg" alt="Editar tarea" />
                </div>
            </TaskStyled>

            {showEditForm && (
                <EditFormStyled
                    className={editFormIsMounted ? "open" : "close"}
                    onAnimationEnd={() => {
                        if (!editFormIsMounted) setShowEditForm(false);
                    }}
                >
                    <div className="form-wrapper">
                        <Form
                            onSubmit={updateDescription}
                            inputPlaceHolder="Nueva descripción"
                            textButton="Guardar"
                        />
                    </div>
                </EditFormStyled>
            )}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        taskIdEditFormOpened: state.taskIdEditFormOpened,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openEditForm: (taskId) => dispatch(openEditForm(taskId)),
        updateTaskDescription: (taskData) =>
            dispatch(updateTaskDescription(taskData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
