import {
    ADD_TO_PENDING,
    REMOVE_FROM_PENDING,
    ADD_TO_DONE,
    REMOVE_FROM_DONE,
    UPDATE_TASK_DESCRIPTION,
} from "taskActions";

import _ from "underscore";


const initialState = {
    pendingTasks: [],
    doneTasks: [],
    positionTask: 0,
};

export const tasksReducer = (state = initialState, action) => {
    if (action.type === ADD_TO_PENDING) {
        const newPendingList = _.sortBy([...state.pendingTasks, action.newTask], "position");
        return {
            ...state,
            pendingTasks: newPendingList,
            positionTask: ++state.positionTask
        };
    }

    if (action.type === REMOVE_FROM_PENDING) {
        return {
            ...state,
            pendingTasks: [...state.pendingTasks.filter( task => task.id !== action.taskId)],
        };
    }
    if (action.type === ADD_TO_DONE) {
        return {
            ...state,
            doneTasks: [...state.doneTasks, action.newTask],
        };
    }
    if (action.type === REMOVE_FROM_DONE) {
        return {
            ...state,
            doneTasks: [...state.doneTasks.filter( task => task.id !== action.taskId)],
        };
    }
    if (action.type === UPDATE_TASK_DESCRIPTION) {
        return {
            ...state,
            [action.tasksList]: state[action.tasksList].map(task => {
                if (task.id === action.taskId) task.description = action.newDescription
                return task
            }),
        };
    }
    return state;
};

export const addToPending = (newTask) => {
    return {
        type: ADD_TO_PENDING,
        newTask,
    };
};

export const removeFromPending = (taskId) => {
    return {
        type: REMOVE_FROM_PENDING,
        taskId
    };
};

export const addToDone = (newTask) => {
    return {
        type: ADD_TO_DONE,
        newTask,
    };
};

export const removeFromDone = (taskId) => {
    return {
        type: REMOVE_FROM_DONE,
        taskId
    };
};

export const updateTaskDescription = ({taskId, tasksList, newDescription}) => {
    return {
        type: UPDATE_TASK_DESCRIPTION,
        taskId,
        tasksList,
        newDescription
    };
};

