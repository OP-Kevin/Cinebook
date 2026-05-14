type LoggedUser = {
  _id: string
  name: string
  email: string
}

const readLoggedUserCookie = () => {
  if (typeof window === "undefined") return null

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("loggedUser="))

  if (!cookie) return null
  return decodeURIComponent(cookie.split("=").slice(1).join("="))
}

export const isLoggedIn = () => {
  try {
    const user = readLoggedUserCookie()
    return user !== null && user !== undefined
  } catch {
    return false
  }
}

export const getLoggedUser = (): LoggedUser | null => {
  try {
    const user = readLoggedUserCookie()
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

type RouterLike = {
  replace: (path: string) => void
  push: (path: string) => void
}

export const requireLogin = (router: RouterLike, path: string) => {
  const user = readLoggedUserCookie()

  if (!user) {
    router.replace("/login")
    return false
  }

  router.push(path)
  return true
}