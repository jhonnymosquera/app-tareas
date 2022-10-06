import Todo from './Todo';

function TodoList({ todos, todoDelete, todoToogleComplete, setTodoEdit, todoEdit }) {
	return (
		<div>
			<h2 className="text-end display-4">Lista de Tareas</h2>

			{todos.length === 0 ? (
				<div>
					<h2 className="alert alert-primary text-center">Agrega una tarea {':)'}</h2>
				</div>
			) : (
				todos.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						todoDelete={todoDelete}
						todoToogleComplete={todoToogleComplete}
						setTodoEdit={setTodoEdit}
						todoEdit={todoEdit}
					/>
				))
			)}
		</div>
	);
}

export default TodoList;
