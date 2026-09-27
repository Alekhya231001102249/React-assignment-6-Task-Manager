import { Link } from "react-router-dom";

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <main className="page-container">
      <h1 className="page-title">
        Completed Tasks
      </h1>

      {completedTasks.length === 0 ? (
        <div className="empty-state">
          <h2>No completed tasks</h2>
          <p>
            Tasks you complete will appear here.
          </p>
        </div>
      ) : (
        <div className="task-grid">
          {completedTasks.map((task) => (
            <div
              className="task-card"
              key={task.id}
            >
              <h2>{task.header}</h2>

              <p className="task-description">
                {task.description}
              </p>

              <div className="task-meta">
                <span className="badge">
                  {task.priority}
                </span>

                <span className="badge">
                  {task.category}
                </span>

                <span className="badge">
                  Completed
                </span>
              </div>

              <Link
                className="btn"
                to={`/tasks/${task.id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default CompletedTasks;