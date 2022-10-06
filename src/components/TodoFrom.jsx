import { useEffect, useState } from 'react';

const initalFormValues = {
	title: '',
	description: '',
};

function TodoFrom({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) {
	const [formValues, setFormValues] = useState(initalFormValues);
	const { title, description } = formValues;
	const [error, setError] = useState(null);
	const [succesMessage, setSuccesMessage] = useState(null);

	useEffect(() => {
		if (todoEdit) {
			setFormValues(todoEdit);
		}
	}, [todoEdit]);

	function handleInputChange(e) {
		const changedFromValues = {
			...formValues,
			[e.target.name]: e.target.value,
		};

		setFormValues(changedFromValues);
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (title.trim() === '') {
			setError('Debes indicar un titulo');
			return;
		}
		if (description.trim() === '') {
			setError('Debe indicar una description');
			return;
		}

		if (todoEdit) {
			todoUpdate(formValues);
			setSuccesMessage('Editado con exito');
		} else {
			todoAdd(formValues);
			setSuccesMessage('Agregado con exito');
		}

		setFormValues(initalFormValues);
		setError(null);

		setTimeout(() => {
			setSuccesMessage(null);
		}, 5000);
	}

	function cancelar() {
		setTodoEdit(null);
		setFormValues(initalFormValues);
	}

	return (
		<div>
			<h2 className="text-center display-5">{todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>

			<form className="d-grid gap-2" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Titulo"
					className="form-control"
					value={title}
					name="title"
					onChange={handleInputChange}
				/>

				<textarea
					placeholder="description"
					className="form-control mt-2"
					value={description}
					name="description"
					onChange={handleInputChange}
				></textarea>

				<button className="btn btn-primary btn-block mt-2">
					{todoEdit ? 'Editar' : 'Agregar'}
				</button>
			</form>

			{todoEdit && (
				<button className="btn btn-primary btn-warning mt-2" onClick={cancelar}>
					Cancelar
				</button>
			)}

			{/* si error es igual a null, no muestra el codigo siguiente a && */}
			{error && <div className="alert alert-danger mt-2 text-center">{error}</div>}

			{succesMessage && (
				<div className="alert alert-success text-center mt-2"> {succesMessage} </div>
			)}
		</div>
	);
}

export default TodoFrom;
