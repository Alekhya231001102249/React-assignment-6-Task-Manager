import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask({ tasks, setTasks }) {
  const navigate = useNavigate();

  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Academic");

  // New fields
  const [dueDate, setDueDate] = useState("2026-08-28");
  const [status, setStatus] = useState("Raised");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!header.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = {
      id: Date.now(),

      header,
      description,

      priority,
      category,

      // Automatically generated
      raisedDate: new Date().toLocaleString(),

      // User selected
      dueDate,

      // User selected
      status,
    };

    setTasks([...tasks, newTask]);

    navigate("/tasks");
  };

  return (
    <main className="page-container add-task-page">

      <div className="add-task-heading">
        <div>
          <p className="section-label">
            TASK MANAGEMENT
          </p>

          <h1 className="page-title">
            Create a new task
          </h1>

          <p className="section-subtitle">
            Add a task and keep your work organized.
          </p>
        </div>

        <div className="add-task-icon">
          +
        </div>
      </div>

      <form
        className="form-container task-form"
        onSubmit={handleSubmit}
      >

        <div className="form-header">
          <h2>Task Information</h2>

          <p>
            Fill in the details below to create your task.
          </p>
        </div>

        {/* Task Header */}

        <div className="form-group">
          <label htmlFor="header">
            Task Header
          </label>

          <input
            id="header"
            type="text"
            placeholder="e.g. Complete React Assignment"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>

        {/* Description */}

        <div className="form-group">
          <label htmlFor="description">
            Task Description
          </label>

          <textarea
            id="description"
            placeholder="Describe what needs to be completed..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
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
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
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
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
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

        {/* Task Information */}

        <div className="task-info-box">

          <div>
            <span>Raised Date</span>

            <strong>
              Automatically
            </strong>
          </div>

          <div>
            <span>Due Date</span>

            <strong>
              {new Date(dueDate).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <strong>
              {status}
            </strong>
          </div>

        </div>

        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn create-task-btn"
          >
            Create Task

            <span>→</span>
          </button>

        </div>

      </form>

    </main>
  );
}

export default AddTask; 