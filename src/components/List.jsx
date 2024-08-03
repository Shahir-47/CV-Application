// List.jsx
import { useState } from "react";
import Form from "./Form";

function List({ items, onSave, data, onAdd, onDelete }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isAdding, setIsAdding] = useState(false);

	const handleItemClick = (index) => {
		if (isAdding) {
			setIsAdding(false); // Close add form when an existing item is clicked
		}
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleAddNew = () => {
		setIsAdding(true);
		setActiveIndex(-1); // Close all items when adding a new one
	};

	const handleSaveNew = (newData) => {
		onAdd(newData);
		setIsAdding(false);
	};

	const handleCancelAdd = () => {
		setIsAdding(false);
	};

	const handleCancelEdit = () => {
		setActiveIndex(-1);
	};

	const handleDelete = (index) => {
		onDelete(index); // Call the onDelete prop with the index to delete the item
	};

	return (
		<div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header">
						<h2 onClick={() => handleItemClick(index)}>{item.title}</h2>
						<button
							type="button"
							className="delete-button"
							onClick={() => handleDelete(index)}
						>
							Delete
						</button>
					</div>
					{activeIndex === index && (
						<div className="item-content">
							<Form
								form={items.form}
								initialValues={item.content}
								onSave={(formData) => onSave(index, formData)}
								onCancel={handleCancelEdit} // Close form on cancel
							/>
						</div>
					)}
				</div>
			))}
			{isAdding && (
				<div className="item new-item">
					<Form
						form={items.form}
						initialValues={{}}
						onSave={handleSaveNew}
						onCancel={handleCancelAdd} // Close form on cancel
					/>
				</div>
			)}
			{!isAdding && ( // Only show "Add New" button when not adding
				<button type="button" onClick={handleAddNew}>
					Add New
				</button>
			)}
		</div>
	);
}

export default List;
