"use client"

import { SessionProvider } from "next-auth/react"
import type { SessionProviderProps } from "next-auth/react"
import React from "react"

export default function SessionWrapper({ children }: { children: SessionProviderProps["children"] }) {
  return (
    <SessionProvider>
      {React.Children.map(children, (child, index) => {
        // Optionally guard: if you want to do something with valid elements
        if (React.isValidElement(child)) {
          return child // or wrap, or cloneElement here if needed
        }
        return child
      })}
    </SessionProvider>
  )
}
