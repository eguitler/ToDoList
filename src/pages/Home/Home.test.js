import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, cleanup } from "@testing-library/react";

import { createStore } from "redux";
import { Provider } from "react-redux";

import Home from ".";
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

function setup({ initialState } = {}) {
    const data = {
        showDoneTasksText: "Mostrar completadas",
        hideDoneTasksText: "Ocultar completadas",
        pendingListText: "PENDIENTES",
        doneListText: "FINALIZADAS",
        checkboxDoneTitle: "Marcar como pendiente",
        checkboxPendingTitle: "Completar tarea",
        pendingTasksListTestId: "pendientes-tasks-list",
        doneTasksListTestId: "finalizadas-tasks-list",
    };
    const component = renderWithRedux(<Home />, {
        initialState,
    });
    return { component, data };
}

test("renders the correct message in the button to hide/show done tasks", () => {
    const { component, data } = setup();

    const button = component.getByText(data.hideDoneTasksText);

    fireEvent.click(button);

    component.getByText(data.showDoneTasksText);

    fireEvent.click(button);

    component.getByText(data.hideDoneTasksText);
});

test("the button to hide/show done list effectively hide and show the done list", () => {
    const { component, data } = setup();

    const button = component.getByText(data.hideDoneTasksText);

    component.getByText(data.doneListText);

    fireEvent.click(button);

    const doneList = component.queryByText(data.doneListText);
    expect(doneList).not.toBeInTheDocument();

    fireEvent.click(button);

    component.getByText(data.doneListText);
});

test("creating a task this is shown in the pending list", () => {
    const { component } = setup();

    let tasks = component.queryAllByTestId("task");
    expect(tasks).toHaveLength(0);

    const input = component.getByPlaceholderText("Nueva tarea");
    const submitButton = component.getByText("Agregar");

    const newTaskDescription = {
        target: {
            value: "This is a description",
        },
    };

    fireEvent.change(input, newTaskDescription);
    fireEvent.click(submitButton);

    tasks = component.queryAllByTestId("task");
    expect(tasks).toHaveLength(1);
});

test("checking a task this is moved to done list", () => {
    const { component, data } = setup();

    // SETTING A NEW TASK
    let task = component.queryByTestId("task");
    expect(task).toBeNull();

    const input = component.getByPlaceholderText("Nueva tarea");
    const submitButton = component.getByText("Agregar");

    const newTaskDescription = {
        target: {
            value: "This is a description",
        },
    };

    fireEvent.change(input, newTaskDescription);
    fireEvent.click(submitButton);

    // TASK IT WAS CREATED AND IS INSIDE OF PENDING LIST
    task = component.getByTestId("task");

    let pendingList = component.getByTestId(data.pendingTasksListTestId);
    let doneList = component.getByTestId(data.doneTasksListTestId);
    expect(pendingList).toContainElement(task);
    expect(doneList).not.toContainElement(task);

    // GETTING THE CHECKBOX AND CLICKING ON IT
    let checkbox = component.getByTitle(data.checkboxPendingTitle);
    expect(checkbox.defaultChecked).toBe(false);

    fireEvent.click(checkbox);

    // TASK IS CHECKED AND NOW IS INSIDE OF DONE LIST
    checkbox = component.getByTitle(data.checkboxDoneTitle);
    expect(checkbox.defaultChecked).toBe(true);

    task = component.getByTestId("task");
    pendingList = component.getByTestId(data.pendingTasksListTestId);
    doneList = component.getByTestId(data.doneTasksListTestId);
    expect(pendingList).not.toContainElement(task);
    expect(doneList).toContainElement(task);

    fireEvent.click(checkbox);

    // NOW TASK IS UNCHECKED AGAIN AND IT RETURNED TO PENDING LIST
    checkbox = component.getByTitle(data.checkboxPendingTitle);
    expect(checkbox.defaultChecked).toBe(false);

    task = component.getByTestId("task");
    pendingList = component.getByTestId(data.pendingTasksListTestId);
    doneList = component.getByTestId(data.doneTasksListTestId);
    expect(pendingList).toContainElement(task);
    expect(doneList).not.toContainElement(task);
});

test("submit is not available when the input is empty", () => {
    const { component } = setup();

    // SETTING A NEW TASK
    let task = component.queryByTestId("task");
    expect(task).toBeNull();

    const input = component.getByPlaceholderText("Nueva tarea");
    const submitButton = component.getByText("Agregar");

    const newTaskDescription = {
        target: {
            value: "",
        },
    };

    fireEvent.change(input, newTaskDescription);
    fireEvent.click(submitButton);

    task = component.queryByTestId("task");
    expect(task).not.toBeInTheDocument();
});

test("we can edit the task description successfuly", () => {
    const { component } = setup();

    // SETTING A NEW TASK
    let task = component.queryByTestId("task");
    expect(task).toBeNull();

    let input = component.getByPlaceholderText("Nueva tarea");
    const submitButton = component.getByText("Agregar");

    const newTaskDescription = {
        target: {
            value: "This is a description",
        },
    };

    fireEvent.change(input, newTaskDescription);
    fireEvent.click(submitButton);

    // TASK IT WAS CREATED AND IS INSIDE OF PENDING LIST
    task = component.getByTestId("task");

    const editButton = component.getByTitle("Editar tarea");

    fireEvent.click(editButton);

    input = component.getByPlaceholderText("Nueva descripción");
    const anotherDescription = { target: { value: "here is another message" } };
    fireEvent.change(input, anotherDescription);

    const submit = component.getByText("Guardar");
    fireEvent.click(submit);

    task = component.getByTestId("task");
    expect(task).not.toHaveTextContent(newTaskDescription.target.value);
    expect(task).toHaveTextContent(anotherDescription.target.value);
});

// test("to open the editBox from one task it closes the editBox of another task", async () => {
//     const { component, data } = setup();

//     // SETTING A NEW TASK
//     let tasks = component.queryAllByTestId("task");
//     expect(tasks).toHaveLength(0);

//     const input = component.getByPlaceholderText("Nueva tarea");
//     const submitButton = component.getByText("Agregar");

//     const newTaskDescriptionOne = {
//         target: {
//             value: "This is a description",
//         },
//     };

//     fireEvent.change(input, newTaskDescriptionOne);
//     fireEvent.click(submitButton);

//     const newTaskDescriptionTwo = {
//         target: {
//             value: "Here is another description",
//         },
//     };

//     fireEvent.change(input, newTaskDescriptionTwo);
//     fireEvent.click(submitButton);

//     // TWO TASKS WERE CREATED AND THEY BOTH ARE INSIDE OF PENDING LIST
//     tasks = component.getAllByTestId("task");
//     expect(tasks).toHaveLength(2);

//     let pendingList = component.getByTestId(data.pendingTasksListTestId)
//     let doneList = component.getByTestId(data.doneTasksListTestId)
//     tasks.forEach(task => {
//         expect(pendingList).toContainElement(task)
//         expect(doneList).not.toContainElement(task)
//     })

//     // WE GET EDITBUTTON OF THE TASK POSITIONED AT INDEX 0 AND WE CLICK ON IT
//     const editButtons = component.getAllByTitle("Editar tarea")
//     expect(editButtons).toHaveLength(2)

//     fireEvent.click(editButtons[0])
//     const inputZero = component.getByPlaceholderText("Nueva descripción")
//     expect(tasks[0]).toContainElement(inputZero)
//     expect(tasks[1]).not.toContainElement(inputZero)

//     act(() => {

//         fireEvent.click(editButtons[1])
//     })
//     let inputOne
//     await waitFor(() => {
//         inputOne = component.getByPlaceholderText("Nueva descripción")

//     })
//     expect(tasks[0]).not.toContainElement(inputOne)
//     expect(tasks[1]).toContainElement(inputOne)
// })
