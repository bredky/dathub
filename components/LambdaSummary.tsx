"use client"

import React from "react"

interface LambdaSummaryProps {
  parsed: any
  notebookCodeMap: Record<string, string> // e.g. { model_type: "...code here..." }
}

export default function LambdaSummary({ parsed, notebookCodeMap }: LambdaSummaryProps) {
  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.06)",
      padding: "32px",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      color: "#f1f5f9",
      marginTop: "40px",
    }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>🧠 lambda summary</h2>

      <div style={{ marginBottom: "20px" }}>
        <strong>model type:</strong> {parsed.model_type}
        <pre style={codeStyle}>{notebookCodeMap.model_type}</pre>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>input file:</strong> {parsed.input_data_file}
        <pre style={codeStyle}>{notebookCodeMap.input_data_file}</pre>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>metrics used:</strong>
        <ul style={{ paddingLeft: "1.2rem" }}>
          {parsed.metrics_used?.map((m: string, i: number) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <pre style={codeStyle}>{notebookCodeMap.metrics_used}</pre>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>tunable parameters:</strong>
        <ul style={{ paddingLeft: "1.2rem" }}>
          {parsed.tunable_parameters?.map((param: any, i: number) => (
            <li key={i}>
              {param.name}: <code>{param.value}</code>
            </li>
          ))}
        </ul>
        <pre style={codeStyle}>{notebookCodeMap.tunable_parameters}</pre>
      </div>

      <div style={{ marginTop: "32px" }}>
        <strong>lambda summary:</strong>
        <p style={{ color: "#cbd5e1", marginTop: "8px" }}>{parsed.brief_summary}</p>
      </div>

      <button style={{
        marginTop: "40px",
        background: "rgba(255,255,255,0.12)",
        padding: "10px 24px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.2)",
        fontWeight: 600,
        color: "#f1f5f9",
        cursor: "pointer",
        transition: "background 0.2s ease"
      }}
      onClick={() => alert("Next: Save to DB and go to /project/[slug]")}>
        looks good?
      </button>
    </div>
  )
}

const codeStyle: React.CSSProperties = {
  backgroundColor: "#1e293b",
  color: "#e2e8f0",
  padding: "12px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  marginTop: "8px",
  overflowX: "auto" as "auto"
}
