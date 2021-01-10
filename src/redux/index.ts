import { combineReducers, createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generate as generateRandomStr } from "randomstring";
// import { textChangeRangeIsUnchanged } from "typescript";

export interface TodoItem {
    id: string;
    text: string;
    isDone: boolean;
}

export interface TodoList {
    list: TodoItem[];
}

const initialState: TodoList = {
    list: []
}

const actionPrefix = "TODOS";
const addTodoItems = createAction<object>(`${actionPrefix}/add`);
const toggleTodoItems = createAction<object>(`${actionPrefix}/toggle`);

const reducers = {
    add: ({ list }: TodoList, { payload: { text, isDone } }: PayloadAction<TodoItem>) => {
        const newTodo: TodoItem = {
            id: generateRandomStr(5),
            text: text.toString(),
            isDone
        };
        list.push(newTodo);
    },
    toggle: ({ list }: TodoList, { payload: { id, isDone } }: PayloadAction<TodoItem>) => {
        const targetIndex = list.findIndex((item: TodoItem) => item.id === id);

        list[targetIndex].isDone = !isDone;
    }
};

const todoSlice = createSlice({
    reducers,
    initialState,
    name: actionPrefix,
});

export const selectTodoList = createSelector(
    (state: TodoList) => state.list,
    (list: TodoItem[]) => list,
);

export const actions = { addTodoItems, toggleTodoItems };

export const rootReducer = combineReducers({
    todos: todoSlice.reducer
});

console.log(todoSlice);

export type RootState = ReturnType<typeof rootReducer>

