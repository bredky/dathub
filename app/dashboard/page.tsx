"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const projects = [
    { name: "dathub", updated: "2 days ago" },
    { name: "roommates", updated: "5 days ago" },
    { name: "offside", updated: "1 week ago" },
  ]

  const activity = [
    "You uploaded cleaned_v2.csv to dathub",
    "Maria ran churn_model_v3",
    "You edited learning_rate in roommates"
  ]

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Sora', sans-serif;
          background-color: #0c1f38;
          color: #d1d5db;
        }

        .dashboard-container {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 260px;
          background-color: #0a172c;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar-title {
          font-size: 1.1rem;
          margin-bottom: 12px;
          color: #cbd5e1;
        }

        .search-input {
          background-color: #12263f;
          color: #f1f5f9;
          padding: 8px;
          margin-bottom: 16px;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .project-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .project-link {
          margin-bottom: 10px;
          font-size: 0.95rem;
          cursor: pointer;
          color: #e2e8f0;
        }

        .project-link:hover {
          text-decoration: underline;
        }

        .footer {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 40px;
        }

        .main-content {
          flex-grow: 1;
          padding: 32px;
          background-color: #0c1f38;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .welcome {
          font-size: 2rem;
          font-weight: 700;
        }

        .button-group button {
          margin-left: 10px;
        }

        .action-button {
          background-color: #1e293b;
          color: #f1f5f9;
          border: none;
          padding: 10px 16px;
          font-size: 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .action-button:hover {
          background-color: #334155;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .project-section, .activity-section {
          background-color: #12263f;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }

        .project-cards {
          list-style: none;
          margin-top: 16px;
          padding: 0;
        }

        .project-card {
          background-color: #1e293b;
          padding: 16px;
          margin-bottom: 12px;
          border-radius: 8px;
          transition: background 0.2s ease;
          cursor: pointer;
        }

        .project-card:hover {
          background-color: #334155;
        }

        .project-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .project-updated {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .activity-list {
          list-style: none;
          padding: 0;
          margin-top: 16px;
        }

        .activity-item {
          padding: 10px 0;
          border-bottom: 1px solid #1e293b;
          font-size: 0.9rem;
          color: #e2e8f0;
        }
      `}</style>

      <div className="dashboard-container">
        <aside className="sidebar">
          <div>
            <h2 className="sidebar-title">Top Projects</h2>
            <input className="search-input" placeholder="Find a project..." />
            <ul className="project-list">
              {projects.map((proj, idx) => (
                <li key={idx} className="project-link">
                  bredky/{proj.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer">&copy; 2025 DatHub</div>
        </aside>

        <main className="main-content">
          <div className="header">
            <h1 className="welcome">welcome, {session?.user?.name?.toLowerCase() || "..."}</h1>
            <div className="button-group">
              <button className="action-button">+ New Project</button>
              <button className="action-button">+ Upload Dataset</button>
            </div>
          </div>

          <div className="grid-container">
            <section className="project-section">
              <h2>Your Projects</h2>
              <ul className="project-cards">
                {projects.map((p, i) => (
                  <li key={i} className="project-card">
                    <p className="project-name">{p.name}</p>
                    <p className="project-updated">Last updated: {p.updated}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="activity-section">
              <h2>Latest Activity</h2>
              <ul className="activity-list">
                {activity.map((a, i) => (
                  <li key={i} className="activity-item">{a}</li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
