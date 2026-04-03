'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type User = { 
  _id?: string; 
  name: string; 
  email: string 
} | null

interface AuthContextType {
  user: User
  login: (userData: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('netrutv_user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('netrutv_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('netrutv_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}