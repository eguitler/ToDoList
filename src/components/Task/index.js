import React, { useState } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { updateTaskDescription } from "taskReducers";
import Form from "components/Form";

const Container = styled.div`
    width: 100%;
`;

const TaskStyled = styled.div`
    display: grid;
    grid-template-columns: 5% 80% 15%;
    align-items: center;
    padding: 10px 0;

    .checkbox {
        cursor: pointer;
    }

    .description {
        text-align: left;
        overflow-wrap: break-word;
        flex-grow: 1;
        padding: 0 15px;

        &.done {
            text-decoration: line-through;
        }
    }

    .edit-icon-wrapper {
        width: 100%;
        cursor: pointer;
        display: grid;
        place-items: center right;

        img {
            height: 35px;
            opacity: 0.4;
        }
    }
`;

const EditFormStyled = styled.div`
    overflow: hidden;
    height: 0px;
    padding-left: 35px;
    padding-right: 5px;

    .form-wrapper {
        padding: 3px 0;
        width: 100%;
        height: 100%;

        @media screen and (min-width: 360px) {
        }
    }

    &.close {
        animation: hide 500ms forwards;
    }

    &.open {
        animation: show 500ms forwards;
    }

    --formHeight: 100px;

    @media screen and (min-width: 360px) {
        --formHeight: 50px;
    }

    @keyframes show {
        from {
            height: 0;
        }
        to {
            height: var(--formHeight);
        }
    }

    @keyframes hide {
        from {
            height: var(--formHeight);
        }
        to {
            height: 0;
        }
    }
`;

const Task = ({ task, checked, onCheck, updateTaskDescription }) => {
    const [editFormIsMounted, setEditFormIsMounted] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const TASKSLISTS = {
        doneTasks: "doneTasks",
        pendingTasks: "pendingTasks",
    };

    function handleEdit() {
        setEditFormIsMounted(!editFormIsMounted);
        if (!showEditForm) setShowEditForm(true);
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

    return (
        <Container>
            <TaskStyled>
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
                    onClick={handleEdit}
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
                            inputName="edit"
                            inputPlaceHolder="Nueva descripción"
                            textButton="Guardar"
                        />
                    </div>
                </EditFormStyled>
            )}
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskDescription: (taskData) =>
            dispatch(updateTaskDescription(taskData)),
    };
};

export default connect(null, mapDispatchToProps)(Task);
