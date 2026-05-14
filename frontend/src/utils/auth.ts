export type LoggedUser = {
  _id: string
  name: string
  email: string
}

export const AUTH_TOKEN_KEY = "cinebook_token"
export const AUTH_USER_KEY = "cinebook_user"

const readLoggedUserCookie = () => {
  if (typeof window === "undefined") return null

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("loggedUser="))

  if (!cookie) return null
  return decodeURIComponent(cookie.split("=").slice(1).join("="))
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

/** For API calls that require JWT */
export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

export function setAuthSession(token: string, user: LoggedUser) {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

export function clearAuthSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  document.cookie = "loggedUser=; Max-Age=0; path=/"
}

export const isLoggedIn = () => {
  try {
    if (typeof window === "undefined") return false
    if (getAuthToken()) return true
    return !!readLoggedUserCookie()
  } catch {
    return false
  }
}

export const getLoggedUser = (): LoggedUser | null => {
  try {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (raw) return JSON.parse(raw) as LoggedUser
    const cookie = readLoggedUserCookie()
    return cookie ? (JSON.parse(cookie) as LoggedUser) : null
  } catch {
    return null
  }
}

type RouterLike = {
  replace: (path: string) => void
  push: (path: string) => void
}

export const requireLogin = (router: RouterLike, path: string) => {
  const user = getLoggedUser()

  if (!user) {
    router.replace("/login")
    return false
  }

  router.push(path)
  return true
}
