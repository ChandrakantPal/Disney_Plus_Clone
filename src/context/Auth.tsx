import { createContext, useContext, useEffect, useReducer } from 'react'

interface State {
  authenticated: boolean
}

interface Action {
  type: string
  payload: any
}

const initialState: State = {
  authenticated: false,
}
const auth = localStorage.getItem('auth')
if (auth) {
  initialState.authenticated = true
} else console.log('no token found')

const StateContext = createContext<State>({
  authenticated: false,
})

const DispatchContext = createContext(null)

const authReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('auth', 'authenticated')
      return {
        ...state,
        authenticated: true,
      }
    case 'LOGOUT':
      localStorage.removeItem('auth')
      return {
        ...state,
        authenticated: false,
      }
    case 'AUTH_CHECK':
      return {
        ...state,
        authenticated: true,
      }
    default:
      throw new Error(`Unknow action type: ${type}`)
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch('AUTH_CHECK')
    }
  }, [])

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)
