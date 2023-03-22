import React, { useEffect, useState } from 'react'
import InputField from './InputField'
import TodoList from './TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Todo } from './models'
import { useAuthFlow } from '../../hooks/useAuthFlow'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import './style.css'

const DragAndDrop: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [inProgressTodos, setInProgressTodos] = useState<Array<Todo>>([])
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([])
  const { auth, isAutheticated } = useAuthFlow()
  const [loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (!isAutheticated()) navigate('/login')
  }, [loading])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    let add
    const active = todos
    const inProgress = inProgressTodos
    const complete = CompletedTodos
    // Source Logic
    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else if (source.droppableId === 'ProgressList') {
      add = inProgress[source.index]
      inProgress.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    // Destination Logic
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else if (destination.droppableId === 'ProgressList') {
      inProgress.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setInProgressTodos(inProgress)
    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          progressList={inProgressTodos}
          setProgressList={setInProgressTodos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default DragAndDrop
