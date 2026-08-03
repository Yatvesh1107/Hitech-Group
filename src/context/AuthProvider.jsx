import { useState, useEffect, useCallback } from "react"
import { loginRequest, meRequest } from "../services/auth"
import { AuthContext } from "./authContext"

const TOKEN_KEY = "hitech_admin_token"

function readStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

function storeToken(newToken, remember) {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(TOKEN_KEY, newToken)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => readStoredToken())
  const [loading, setLoading] = useState(() => Boolean(readStoredToken()))

  useEffect(() => {
    if (!token) {
      return
    }

    let cancelled = false

    meRequest(token)
      .then((data) => {
        if (cancelled) return
        setUser(data.user)
      })
      .catch(() => {
        if (cancelled) return
        clearToken()
        setToken(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const login = useCallback(async (email, password, remember) => {
    const data = await loginRequest(email, password)
    storeToken(data.token, remember)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
