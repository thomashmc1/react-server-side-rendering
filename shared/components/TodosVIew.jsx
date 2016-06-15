import React from 'react';
export default class TodosView extends React.Component {
  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);
    console.log(this.props)
    // Equivalent to `dispatch(deleteTodo())`
    this.props.deleteToDo(id);
  }
  handleEdit = (e) => {
    const id  = Number(e.target.dataset.id);
    const val = this.props.todos.get(id).text
    
    // For cutting edge UX
    let newVal = window.prompt('', val);
    this.props.editTodo(id, newVal);
  }
 
  render() {    
    var todoItems = null

    if(this.props.todos){
      todoItems = this.props.todos.map( (todo, index) => {
        console.log(todo)
        return (
          <div key={index}>
            <span>{todo}</span>
          
            <button data-id={index} onClick={this.handleDelete}>
              X
            </button>
            <button data-id={index} onClick={this.handleEdit}>
              Edit
            </button>
          </div>
        )
      })
    }

    return (
      <div id="todo-list">
        {todoItems}
      </div>
    )
  }
}