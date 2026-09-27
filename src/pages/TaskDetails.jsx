import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetails({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(
    (item) => item.id.toString() === id
  );

  const [isEditing, setIsEditing] = useState(false);

  const [editTask, setEditTask] = useState(
    task
      ? {
          header: task.header,
          description: task.description,
          priority: task.priority,
          category: task.category,
          dueDate: task.dueDate,
          status: task.status,
        }
      : null
  );

  // If task doesn't exist
  if (!task || !editTask) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Task not found</h2>

          <p>
            The task you are looking for does not exist.
          </p>

          <br />

          <button
            className="btn"
            onClick={() => navigate("/tasks")}
          >
            Back to Tasks
          </button>
        </div>
      </main>
    );
  }

  // Change edit field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  // Save changes
  const handleSave = () => {
    if (!editTask.header.trim()) {
      alert("Task Header cannot be empty.");
      return;
    }

    if (!editTask.description.trim()) {
      alert("Task Description cannot be empty.");
      return;
    }

    const updatedTasks = tasks.map((item) =>
      item.id.toString() === id
        ? {
            ...item,
            header: editTask.header,
            description: editTask.description,
            priority: editTask.priority,
            category: editTask.category,
            dueDate: editTask.dueDate,
            status: editTask.status,
          }
        : item
    );

    setTasks(updatedTasks);

    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditTask({
      header: task.header,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      status: task.status,
    });

    setIsEditing(false);
  };

  // Delete task
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const updatedTasks = tasks.filter(
      (item) => item.id.toString() !== id
    );

    setTasks(updatedTasks);

    navigate("/tasks");
  };

  return (
    <main className="page-container details-page">

      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="details-page-header">

        <div>
          <p className="section-label">
            TASK DETAILS
          </p>

          <h1 className="page-title">
            {isEditing
              ? "Edit task"
              : "Task details"}
          </h1>

          <p className="section-subtitle">
            {isEditing
              ? "Update your task information."
              : "View and manage your task."}
          </p>
        </div>

        <div className="details-header-icon">
          ✓
        </div>

      </div>

      {/* ==============================
          VIEW MODE
      ============================== */}

      {!isEditing && (
        <div className="details-card">

          <div className="details-title-section">

            <div>
              <span className="details-category">
                {task.category}
              </span>

              <h2>
                {task.header}
              </h2>

              <p className="details-description">
                {task.description}
              </p>
            </div>

            <span
              className={`status-badge status-${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {task.status}
            </span>

          </div>

          {/* Task Information */}

          <div className="details-information">

            <div className="details-information-item">
              <span>Priority</span>

              <strong>
                {task.priority}
              </strong>
            </div>

            <div className="details-information-item">
              <span>Category</span>

              <strong>
                {task.category}
              </strong>
            </div>

            <div className="details-information-item">
              <span>Raised Date</span>

              <strong>
                {task.raisedDate}
              </strong>
            </div>

            <div className="details-information-item">
              <span>Due Date</span>

              <strong>
                {formatDueDate(task.dueDate)}
              </strong>
            </div>

            <div className="details-information-item">
              <span>Status</span>

              <strong>
                {task.status}
              </strong>
            </div>

          </div>

          {/* Actions */}

          <div className="details-actions">

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/tasks")}
            >
              ← Back
            </button>

            <div className="details-right-actions">

              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>

              <button
                className="btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Task
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ==============================
          EDIT MODE
      ============================== */}

      {isEditing && (
        <div className="form-container details-edit-form">

          <div className="form-header">
            <h2>
              Edit Task
            </h2>

            <p>
              Update the information for this task.
            </p>
          </div>

          {/* Header */}

          <div className="form-group">

            <label htmlFor="header">
              Task Header
            </label>

            <input
              id="header"
              name="header"
              type="text"
              value={editTask.header}
              onChange={handleChange}
              placeholder="Enter task title"
            />

          </div>

          {/* Description */}

          <div className="form-group">

            <label htmlFor="description">
              Task Description
            </label>

            <textarea
              id="description"
              name="description"
              value={editTask.description}
              onChange={handleChange}
              placeholder="Describe your task"
            />

          </div>

          {/* Priority + Category */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="priority">
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={editTask.priority}
                onChange={handleChange}
              >
                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>

            </div>

            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={editTask.category}
                onChange={handleChange}
              >
                <option value="Academic">
                  Academic
                </option>

                <option value="Personal">
                  Personal
                </option>
              </select>

            </div>

          </div>

          {/* Due Date + Status */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="dueDate">
                Due Date
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={convertToInputDate(
                  editTask.dueDate
                )}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={editTask.status}
                onChange={handleChange}
              >
                <option value="Raised">
                  Raised
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

            </div>

          </div>

          {/* Status Preview */}

          <div className="edit-status-preview">

            <div>
              <span>Current Status</span>

              <strong>
                {editTask.status}
              </strong>
            </div>

            <div>
              <span>Due Date</span>

              <strong>
                {formatDueDate(editTask.dueDate)}
              </strong>
            </div>

          </div>

          {/* Buttons */}

          <div className="form-actions">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn create-task-btn"
              onClick={handleSave}
            >
              Save Changes
              <span>→</span>
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

/* ==========================================
   DATE HELPERS
========================================== */

function convertToInputDate(date) {
  if (!date) return "";

  // Already in YYYY-MM-DD format
  if (
    /^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return date;
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();

  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDueDate(date) {
  if (!date) return "Not set";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default TaskDetails;