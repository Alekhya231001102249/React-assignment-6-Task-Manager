import { Link } from "react-router-dom";

function Tasks({ tasks }) {
  // Only show tasks that are NOT completed
  const activeTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  return (
    <main className="page-container">

      <div className="add-task-heading">
        <div>
          <p className="section-label">
            TASK MANAGEMENT
          </p>

          <h1 className="page-title">
            All Tasks
          </h1>

          <p className="section-subtitle">
            Manage your active and pending tasks.
          </p>
        </div>

        <Link
          to="/add-task"
          className="btn"
        >
          + Add Task
        </Link>
      </div>

      {activeTasks.length === 0 ? (
        <div className="empty-state">
          <h2>No active tasks</h2>

          <p>
            All your tasks have been completed.
          </p>

          <br />

          <Link
            to="/add-task"
            className="btn"
          >
            Create New Task
          </Link>
        </div>
      ) : (
        <div className="task-grid">

          {activeTasks.map((task) => (
            <div
              className="task-card"
              key={task.id}
            >

              <div className="task-meta">

                <span className="badge">
                  {task.priority}
                </span>

                <span className="badge">
                  {task.category}
                </span>

                <span className="badge">
                  {task.status}
                </span>

              </div>

              <h2>
                {task.header}
              </h2>

              <p className="task-description">
                {task.description}
              </p>

              <p>
                Due: {formatDueDate(task.dueDate)}
              </p>

              <div className="task-actions">

                <Link
                  to={`/tasks/${task.id}`}
                  className="btn"
                >
                  View Details
                </Link>

              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}

function formatDueDate(date) {
  if (!date) return "Not set";

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    const [year, month, day] = date.split("-");

    return `${day} ${new Date(
      year,
      month - 1
    ).toLocaleString("en-US", {
      month: "short",
    })} ${year}`;
  }

  return date;
}

export default Tasks;