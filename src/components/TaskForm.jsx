import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'
import {v4 as uuid} from 'uuid'
import {useNavigate, useParams} from 'react-router-dom'

function TaskForm() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const tasks = useSelector(state => state.tasks)

  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const handleChange = ({target}) => {
    setTask({
      ...task,
      [target.name] : target.value
    })

  }

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find(task => task.id === params.id))
    }
  }, [params.id, tasks])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (params.id) {
      dispatch(editTask(task))
    } else {
      dispatch(addTask({
        ...task,
        id: uuid(),
      }))

    }

    navigate('/')
   }


  return (
    <form onSubmit={handleSubmit} className='bg-zinc-800 max-w-sm p-4 rounded-md' >
      <label htmlFor="title" className='block text-xs font-bold mb-2'>Task:</label>
      <input type="text" placeholder='title' name='title' id='title' onChange={handleChange} value={task.title} 
      className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />
      <label htmlFor="description" className='block text-xs font-bold mb-2'>Description:</label>
      <textarea name="description" id="description"  placeholder='description' onChange={handleChange} value={task.description} className='w-full p-2 rounded-md bg-zinc-600 mb-2' ></textarea>
      <button className='bg-indigo-600 px-2 py-1 rounded-md'>Save</button>
    </form>
  )
}

export default TaskForm