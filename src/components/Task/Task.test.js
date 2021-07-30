import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, cleanup } from "@testing-library/react";

import { createStore } from "redux";
import { Provider } from "react-redux";

import Task from ".";
import { tasksReducer } from "taskReducers";

afterEach(cleanup);

const defaultState = {
    pendingTasks: [],
    doneTasks: [],
    positionTask: 0,
    taskIdEditFormOpened: null,
};

function renderWithRedux(
    component,
    {
        initialState = defaultState,
        store = createStore(tasksReducer, initialState),
    } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
}

function setup({ newTask, initialState = {} }) {
    const data = {
        checkboxTitle: "Completar tarea",
        editButtonText: "Editar tarea",
        editFormTestId: "edit-form-wrapper",
        inputPlaceHolder: "Nueva descripción",
        submitButtonText: "Guardar",
    };
    const component = renderWithRedux(<Task task={newTask} />, {
        initialState,
    });
    return { component, data };
}

test("task is rendered correctly without editBox", () => {
    const newTask = {
        id: "task-id-1",
        description: "some description",
        checked: false,
        position: 0,
    };

    const { component, data } = setup({ newTask });

    // unchecked checkbox
    const checkbox = component.getByTitle(data.checkboxTitle);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.defaultChecked).toBe(newTask.checked);

    // p element with description
    const description = component.getByText(newTask.description);
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe(newTask.description);

    // div wrapper with edit icon inside
    const editButton = component.getByTitle(data.editButtonText);
    expect(editButton).toBeInTheDocument();

    // edit form is not displayed by default
    const formWrapper = component.queryByTestId(data.editFormTestId);
    expect(formWrapper).not.toBeInTheDocument();

    const input = component.queryByPlaceholderText(data.inputPlaceHolder);
    expect(input).not.toBeInTheDocument();

    const submitButton = component.queryByText(data.submitButtonText);
    expect(submitButton).not.toBeInTheDocument();
});

test("editBox is displayed after clicking on editButton and it is closed after clicking it again", () => {
    const newTask = {
        id: "task-id-1",
        description: "some description",
        checked: false,
        position: 0,
    };

    const { component, data } = setup({ newTask });

    const editButton = component.getByTitle(data.editButtonText);

    // opening editBox
    fireEvent.click(editButton);

    let formWrapper = component.getByTestId(data.editFormTestId);
    let input = component.getByPlaceholderText(data.inputPlaceHolder);
    let submitButton = component.getByText(data.submitButtonText);

    // closing editBox
    fireEvent.click(editButton);
    fireEvent.animationEnd(formWrapper);

    expect(formWrapper).not.toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
});