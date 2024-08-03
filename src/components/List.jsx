// List.jsx
import { useState } from "react";
import Form from "./Form";

function List({ items, onSave, data, onAdd }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isAdding, setIsAdding] = useState(false); // State to manage adding new entries

	const handleItemClick = (index) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleAddNew = () => {
		setIsAdding(true);
		setActiveIndex(-1); // Close other items while adding a new one
	};

	const handleSaveNew = (newData) => {
		onAdd(newData);
		setIsAdding(false);
	};

	const handleCancelAdd = () => {
		setIsAdding(false);
	};

	return (
		<div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header" onClick={() => handleItemClick(index)}>
						<h2>{item.title}</h2>
					</div>
					{activeIndex === index && (
						<div className="item-content">
							<Form
								form={items.form}
								initialValues={item.content}
								onSave={(formData) => onSave(index, formData)}
							/>
						</div>
					)}
				</div>
			))}
			{isAdding && (
				<div className="item new-item">
					<Form
						form={items.form}
						initialValues={{}} // Start with empty values for new entries
						onSave={handleSaveNew}
					/>
					<button type="button" onClick={handleCancelAdd}>
						Cancel
					</button>
				</div>
			)}
			<button type="button" onClick={handleAddNew}>
				Add New
			</button>
		</div>
	);
}

export default List;
