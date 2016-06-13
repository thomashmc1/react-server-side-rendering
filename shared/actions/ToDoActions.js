export function createTodo(text){
  return {
    type: 'CREATE_TODO',
    text,
    date: Date.now()
  }
}

export function editTodo(id, text){
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  }
}

export function deleteToDo(id){
  return (
    type: 'DELETE_TODO',
    id
  )
}