function Dashboard({ tasks }) {
    const totalTasks = tasks.length;

    const raisedTasks = tasks.filter(
        (task) => task.status === "Raised"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    return (
        <main className="page-container">
            <div className="dashboard-header">
                <h1 className="page-title">
                    Task Manager Dashboard
                </h1>

                <p>
                    Manage your academic and personal tasks in one place.
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p>{totalTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Raised</h3>
                    <p>{raisedTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pendingTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Completed</h3>
                    <p>{completedTasks}</p>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;