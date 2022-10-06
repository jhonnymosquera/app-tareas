import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoFrom from './components/TodoFrom';

const initialTodos = [
	{
		id: 1,
		title: 'Todo #1',
		description: 'Desc del Todo #1',
		completed: false,
	},

	{
		id: 2,
		title: 'Todo #2',
		description: 'Desc del Todo #2',
		completed: true,
	},
];

const localTodos = JSON.parse(localStorage.getItem('todos'));

function App() {
	const [todos, setTodos] = useState(localTodos || initialTodos);
	const [todoEdit, setTodoEdit] = useState(null);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	function todoDelete(todoId) {
		const changedTodos = todos.filter((todo) => todo.id !== todoId);

		setTodos(changedTodos);
	}

	function todoToogleComplete(todoId) {
		// const changedTodos = todos.map((todo) => {
		// 	const todoEdit = {
		// 		...todo,
		// 		completed: !todo.completed,
		// 	};

		// 	if (todo.id === todoId) {
		// 		return todoEdit;
		// 	} else {
		// 		return todo;
		// 	}
		// });

		const changedTodos = todos.map((todo) =>
			todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
		);

		// Cambiar el estado de falso a verdadero y veceversa con un click

		setTodos(changedTodos);
	}

	function todoAdd(todo) {
		const newTodo = {
			id: Date.now(),
			...todo,
			completed: false,
		};

		const changedTodos = [...todos, newTodo];

		setTodos(changedTodos);
	}

	function todoUpdate(todoUp) {
		const changedTodos = todos.map((todo) => (todo.id === todoUp.id ? todoUp : todo));

		setTodos(changedTodos);
		setTodoEdit(null);
	}

	return (
		<div className="container mt-4">
			<div className="row">
				<div className="col-8">
					<TodoList
						todos={todos}
						todoDelete={todoDelete}
						todoToogleComplete={todoToogleComplete}
						setTodoEdit={setTodoEdit}
						todoEdit={todoEdit}
					/>
				</div>
				<div className="col-4">
					<TodoFrom
						todoAdd={todoAdd}
						todoEdit={todoEdit}
						todoUpdate={todoUpdate}
						setTodoEdit={setTodoEdit}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
