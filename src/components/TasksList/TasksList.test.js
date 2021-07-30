import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { createStore } from "redux";
import { Provider } from "react-redux";

import TasksList from ".";
import { tasksReducer } from "taskReducers";

function renderWithRedux(
    component,
    { initialState, store = createStore(tasksReducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
}

function setup(tasks) {
    const data = {
        title: "Testing Title",
        emptyMsg: "No tienes tareas en esta lista",
        tasks,
    };

    const component = renderWithRedux(
        <TasksList title={data.title} tasks={data.tasks} />
    );
    return { component, data };
}

test("renders the title and a message when there is no tasks", () => {
    const tasks = [];
    const { component, data } = setup(tasks);

    component.getByText(data.title);
    component.getByText(data.emptyMsg);
});

test("renders all tasks correctly", () => {
    const tasks = [
        {
            id: "task-id-1",
            description: "this is a description",
            checked: false,
            position: 0,
        },
        {
            id: "task-id-2",
            description: "this is a description",
            checked: false,
            position: 1,
        },
    ];
    const { component, data } = setup(tasks);

    const msg = component.queryByText(data.emptyMsg);
    expect(msg).not.toBeInTheDocument();

    const descriptions = component.queryAllByText("this is a description");
    expect(descriptions).toHaveLength(2);
});
