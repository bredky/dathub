"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter()

  const [showEnterButton, setShowEnterButton] = useState(false)

  useEffect(() => {
    if (session && !loading) {
      const timeout = setTimeout(() => setShowEnterButton(true), 300)
      return () => clearTimeout(timeout)
    }
  }, [session, loading])

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        html, body {
          overscroll-behavior: none;
          margin: 0;
          padding: 0;
          background-color: #0c1f38;
          font-family: 'Sora', sans-serif;
        }

        .fullscreen-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #0c1f38;
        }

        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          pointer-events: none;
        }

        .content-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(12, 31, 56, 0.5);
          backdrop-filter: blur(8px);
        }

        .welcome-text {
          font-size: 4rem;
          font-weight: 700;
          color: #d1d5db;
          margin-bottom: 3rem;
          text-align: center;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }

        .glass-button {
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 1rem;
          color: #d1d5db;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          margin: 0.5rem 0;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 1.5s ease forwards;
          animation-delay: 0.3s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .welcome-text {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="fullscreen-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="content-overlay">
          {!loading && (
            <>
              <h1 className="welcome-text">
                {session ? `welcome ${session.user?.name?.toLowerCase()}` : "welcome to dathub"}
              </h1>

              {session ? (
                <>
                  <button onClick={() => signOut()} className="glass-button">
                    sign out
                  </button>

                  {showEnterButton && (
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="glass-button fade-in"
                    >
                      open your dathub
                    </button>
                  )}
                </>
              ) : (
                <button onClick={() => signIn("github")} className="glass-button">
                  sign in w github
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
