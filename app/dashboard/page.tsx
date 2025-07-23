"use client"

import { useSession, signOut} from "next-auth/react"
import { useState } from "react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [showOverlaySidebar, setShowOverlaySidebar] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const projects = [
    { name: "dathub", updated: "2 days ago" },
    { name: "roommates", updated: "5 days ago" },
    { name: "offside", updated: "1 week ago" },
  ]

  const activity = [
    "you uploaded cleaned_v2.csv to dathub",
    "maria ran churn_model_v3",
    "you edited learning_rate in roommates"
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
          color: #d1d5db;
          text-transform: lowercase;
        }

        .top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          height: 64px;
          background-color: #0a172c;
          border-bottom: 1px solid #1e293b;
          position: relative;
          z-index: 2;
        }

        .left-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dathub-label {
          font-size: 1.2rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .pill-button {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .pill-button:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .right-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-input {
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          padding: 8px 14px;
          border-radius: 9999px;
          font-size: 0.85rem;
          outline: none;
          width: 200px;
          backdrop-filter: blur(6px);
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #334155;
        }

        .dashboard-container {
          display: flex;
          height: calc(100vh - 64px);
        }

        .sidebar {
          width: 260px;
          background-color: #0a172c;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
        }

        .sidebar-title {
          font-size: 1.1rem;
          margin-bottom: 12px;
          color: #cbd5e1;
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

        .dashboard-video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
          pointer-events: none;
        }

        .main-content-overlay-wrapper {
          position: relative;
          flex-grow: 1;
          height: 100%;
          z-index: 1;
        }

        .main-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(12, 31, 56, 0.75); /* Your desired semi-transparent blue */
  z-index: 0;
}

        .main-content {
          position: relative;
          z-index: 1;
          padding: 32px;
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

        .overlay-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background-color: rgba(10, 23, 44, 0.65);
          backdrop-filter: blur(12px);
          padding: 24px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.3);
          z-index: 999;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .overlay-sidebar.show {
          transform: translateX(0);
        }

        .overlay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .overlay-title {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .overlay-close {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          border-radius: 8px;
          font-size: 0.9rem;
          padding: 4px 10px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .overlay-close:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .overlay-item {
          margin-bottom: 14px;
          font-size: 0.9rem;
          color: #cbd5e1;
          cursor: pointer;
        }

        .sidebar-divider {
          border: none;
          border-top: 1px solid #1f2937;
          margin: 16px 0;
        }

        .projects-section {
          margin-top: 16px;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #94a3b8;
          font-size: 0.85rem;
          margin-bottom: 12px;
        }

        .section-title {
          font-weight: 600;
        }

        .repo-icon {
          font-size: 0.6rem;
          margin-right: 8px;
          color: #cbd5e1;
        }

        .show-more {
          font-size: 0.8rem;
          color: #94a3b8;
          cursor: pointer;
          margin-top: 8px;
          display: inline-block;
        }
          .avatar-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.85rem;
  color: #f1f5f9;
  cursor: pointer;
  white-space: nowrap;
  z-index: 999;
  transition: background 0.2s ease;
}

.dropdown-menu:hover {
  background: rgba(255, 255, 255, 0.12);
}

      `}</style>

      {/* Header */}
      <div className="top-header">
        <div className="left-header">
          <button className="pill-button" onClick={() => setShowOverlaySidebar(!showOverlaySidebar)}>sidebar</button>
          <div className="dathub-label">dathub</div>
        </div>
        <div className="right-header">
          <button className="pill-button">+ new project</button>
          <button className="pill-button">+ upload dataset</button>
          <input className="search-input" placeholder="search" />
          <div className="avatar-container">
  {session?.user?.image && (
    <img
      src={session.user.image}
      alt="profile"
      className="avatar"
      onClick={() => setShowDropdown(prev => !prev)}
    />
  )}
  {showDropdown && (
    <div className="dropdown-menu" onClick={() => {
      setShowDropdown(false);
      signOut({ callbackUrl: "/" });
    }}>
      sign out
    </div>
  )}
</div>

        </div>
      </div>

      {/* Background Video */}
      <video autoPlay loop muted playsInline className="dashboard-video-background">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay Sidebar */}
      <div className={`overlay-sidebar ${showOverlaySidebar ? "show" : ""}`}>
        <div className="overlay-header">
          <div className="overlay-title">list</div>
          <button className="overlay-close" onClick={() => setShowOverlaySidebar(false)}>✕</button>
        </div>
        <div className="overlay-item">datasets</div>
        <div className="overlay-item">experiments</div>
        <div className="overlay-item">model requests</div>
        <div className="overlay-item">notebooks</div>
        <hr className="sidebar-divider" />
        <div className="overlay-item">explore</div>
        <div className="overlay-item">marketplace</div>
        <div className="overlay-item">ask lambda</div>
        <hr className="sidebar-divider" />
        <div className="projects-section">
          <div className="projects-header">
            <span className="section-title">projects</span>
          </div>
          <ul className="project-list">
            {projects.map((proj, idx) => (
              <li key={idx} className="project-link">
                <span className="repo-icon">⏺</span>
                bredky/{proj.name}
              </li>
            ))}
          </ul>
          <span className="show-more">show more</span>
        </div>
      </div>

      {/* Main App */}
      <div className="dashboard-container">
        <aside className="sidebar">
          <div>
            <h2 className="sidebar-title">top projects</h2>
            <ul className="project-list">
              {projects.map((proj, idx) => (
                <li key={idx} className="project-link">bredky/{proj.name}</li>
              ))}
            </ul>
          </div>
          <div className="footer">&copy; 2025 dathub</div>
        </aside>

<div className="main-content-overlay-wrapper">
  <div className="main-bg-overlay" />
  <main className="main-content">
            <div className="header">
              <h1 className="welcome">welcome, {session?.user?.name?.toLowerCase() || "..."}</h1>
            </div>

            <div className="grid-container">
              <section className="project-section">
                <h2>your projects</h2>
                <ul className="project-cards">
                  {projects.map((p, i) => (
                    <li key={i} className="project-card">
                      <p className="project-name">{p.name}</p>
                      <p className="project-updated">last updated: {p.updated}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="activity-section">
                <h2>latest activity</h2>
                <ul className="activity-list">
                  {activity.map((a, i) => (
                    <li key={i} className="activity-item">{a}</li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
