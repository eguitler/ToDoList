import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { tasksReducer } from "taskReducers";

const persistConfig = {
    key: "tasks",
    storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

const store = createStore(persistedReducer, applyMiddleware());

const persistor = persistStore(store);

export { store, persistor };
