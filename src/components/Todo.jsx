import { useEffect, useState } from 'react';

function Todo({ todo, todoDelete, todoToogleComplete, setTodoEdit, todoEdit }) {
	const [deleteEdit, setDeleteEdit] = useState(null);

	useEffect(() => {
		if (deleteEdit) {
			setTimeout(() => {
				setDeleteEdit(null);
			}, 5000);
		}
	}, [deleteEdit]);

	return (
		<div className="card mt-3">
			<div className="card-body">
				<h3 className="card-tittle text-end">{todo.title}</h3>
				<p className="card-text text-end"> {todo.description}</p>
				<hr />
				<div className="d-flex justify-content-end">
					{deleteEdit && (
						<div className="bg-danger me-5 p-1 rounded-2 text-light">Estas editando</div>
					)}

					<button
						className={`btn btn-sm me-2 ${todo.completed ? 'btn-success' : 'btn-outline-success'}`}
						onClick={() => todoToogleComplete(todo.id)}
					>
						{todo.completed ? 'Terminado' : 'Terminar'}
					</button>

					<button className="btn btn-sm btn-outline-primary me-2" onClick={() => setTodoEdit(todo)}>
						Editar
					</button>
					<button
						className="btn btn-sm btn-outline-danger"
						onClick={() => {
							if (todoEdit) {
								setDeleteEdit(1);
								return;
							}
							todoDelete(todo.id);
						}}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
}

export default Todo;
