import {TodoState, OneToDo, IOneToDo  } from "../../types/todo"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodoState = {
    todos: [
        { id:1, title:" Tasak mek ", status: false},
        { id:2, title:" Tasak mek 2", status: false}
    ],
    error: null,
    loading: false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<OneToDo>){
            state.todos = [...state.todos, action.payload]
        },
        deleteTodo(state, action: PayloadAction<string>){
            state.todos = state.todos.filter(item => item.id !== action.payload )
        },
        changeTodo(state, action: PayloadAction<IOneToDo>){
            let  allState = state.todos.filter(item => item.id !== action.payload.id )
            state.todos  = [...allState, action.payload]

        }
    }
})


export default todoSlice.reducer;