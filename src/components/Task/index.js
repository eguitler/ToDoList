import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    border: 1px solid;
    padding: 10px 20px;
    width: 100%;
`;

const EditFormStyled = styled.div`
    overflow: hidden;
    transition: height 1s;
    height: 0px;

    form {
        display: flex;
        justify-content: space-between;

        input {
            width: 60%;
        }
        button {
            width: 35%;
        }
    }

    &.close {
        animation: hide 1s forwards;
    }

    &.open {
        animation: show 1s forwards;
    }

    @keyframes show {
        from {
            height: 0;
        }
        to {
            height: 40px;
        }
    }
    @keyframes hide {
        from {
            height: 40px;
        }
        to {
            height: 0;
        }
    }
`;

const Task = ({ task, checked = false, onCheck = null }) => {
    const [editFormIsMounted, setEditFormIsMounted] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const value = e.target.edit.value
    }

    function handleEdit() {
        setEditFormIsMounted(!editFormIsMounted);
        if (!showEditForm) setShowEditForm(true);
    }

    return (
        <Container>
            <input
                name="checkbox"
                type="checkbox"
                taskid={task.id}
                defaultChecked={checked}
                onClick={onCheck}
            />
            <span>{task.position} </span>
            <span>{task.description} </span>
            <button type="button" onClick={handleEdit}>
                edit
            </button>
            {showEditForm && (
                <EditFormStyled
                    className={editFormIsMounted ? "open" : "close"}
                    onAnimationEnd={() => {
                        if (!editFormIsMounted) setShowEditForm(false);
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <input name="edit" />
                        <button>Guardar</button>
                    </form>
                </EditFormStyled>
            )}
        </Container>
    );
};

export default Task;
