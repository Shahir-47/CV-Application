// List.js
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Modal from "./Modal"; // Import the Modal component
import Toaster from "./Toaster"; // Import the Toaster component

function List({ items, onSave, data, onAdd, onDelete }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isAdding, setIsAdding] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [deleteItemIndex, setDeleteItemIndex] = useState(null);
	const [toastMessage, setToastMessage] = useState(""); // State for toaster message
	const [toastType, setToastType] = useState("success"); // State for toaster type
	const [isToastVisible, setIsToastVisible] = useState(false); // State for toaster visibility

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
		setToastMessage("Entry added successfully!");
		setToastType("success");
		setIsToastVisible(true);
	};

	const handleCancelAdd = () => {
		setIsAdding(false);
	};

	const handleCancelEdit = () => {
		setActiveIndex(-1);
	};

	const handleDelete = (index) => {
		setDeleteItemIndex(index);
		setShowModal(true); // Show the modal when delete action is triggered
	};

	const confirmDeleteItem = () => {
		onDelete(deleteItemIndex);
		setShowModal(false); // Close the modal after confirming
		setActiveIndex(-1); // Close the form after deleting an item
		setToastMessage("Entry deleted successfully!");
		setToastType("success");
		setIsToastVisible(true);
	};

	const handleMoveItem = (index, direction) => {
		const updatedData = [...data];
		let newIndex = index;

		if (direction === "up" && index > 0) {
			[updatedData[index], updatedData[index - 1]] = [
				updatedData[index - 1],
				updatedData[index],
			];
			newIndex = index - 1;
		} else if (direction === "down" && index < updatedData.length - 1) {
			[updatedData[index], updatedData[index + 1]] = [
				updatedData[index + 1],
				updatedData[index],
			];
			newIndex = index + 1;
		}

		// Ensure the active item stays active when moved
		setActiveIndex((prevIndex) =>
			prevIndex === index
				? newIndex
				: prevIndex === newIndex
				? index
				: prevIndex
		);

		onSave(null, updatedData); // Save updated data
		setToastMessage("Item moved successfully!");
		setToastType("success");
		setIsToastVisible(true);
	};

	// Effect to automatically hide the toaster after a few seconds
	useEffect(() => {
		if (isToastVisible) {
			const timer = setTimeout(() => {
				setIsToastVisible(false);
			}, 3000); // Hide after 3 seconds

			return () => clearTimeout(timer);
		}
	}, [isToastVisible]);

	return (
		<div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header">
						<h2 onClick={() => handleItemClick(index)}>{item.title}</h2>
						<div className="item-controls">
							<button
								type="button"
								className="move-up-button"
								onClick={() => handleMoveItem(index, "up")}
								disabled={index === 0} // Disable if at the top
							>
								Up
							</button>
							<button
								type="button"
								className="move-down-button"
								onClick={() => handleMoveItem(index, "down")}
								disabled={index === data.length - 1} // Disable if at the bottom
							>
								Down
							</button>
							<button
								type="button"
								className="delete-button"
								onClick={() => handleDelete(index)}
							>
								Delete
							</button>
						</div>
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
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={confirmDeleteItem}
				message="Are you sure you want to delete this item?"
			/>
			<Toaster
				message={toastMessage}
				type={toastType}
				isVisible={isToastVisible}
			/>
		</div>
	);
}

export default List;
