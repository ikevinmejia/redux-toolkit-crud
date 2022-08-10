import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        title: "Task 1",
        description: "Task 1 description",
        completed: false
    },
    {
        id: "2",
        title: "Task 2",
        description: "Task 2 description",
        completed: false
    },
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            // agregar un objeto a un arreglo de objetos
            // [...state, action.payload]
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
            // Encontrar un elemento por el ID del boton del form en TaskList
            const taskFound = state.find(task => task.id === action.payload)
            // Eliminar del arreglo por el indice
            state.splice(state.indexOf(taskFound), 1)
        },
        editTask: (state, action) => {
            const {id, title, description} = action.payload
            const foundTask = state.find(task => task.id === id);
            if (foundTask) {
                foundTask.title = title
                foundTask.description = description
            }
        }
    }
})

export const {addTask, deleteTask, editTask} = taskSlice.actions

export default taskSlice.reducer;