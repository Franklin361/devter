import { useContext } from "react"
import { AuthContext } from "../context"

export const useAuthContext = () => {
  const auth = useContext(AuthContext)
  return {...auth}
}