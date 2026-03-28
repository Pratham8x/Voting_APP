import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AuthState } from './authTypes'
import { loginApi } from '../../Api/LoginApi'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginApi(payload.email, payload.password)
      // 👇 Log this so you can see exactly what your API returns
      console.log('LOGIN API RESPONSE:', JSON.stringify(data, null, 2))
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        const payload = action.payload

        // Handles both shapes:
        // Shape A: { user: { id, name, email, role }, token }
        // Shape B: { id, name, email, role, token }
        if (payload.user) {
          state.user = {
            ...payload.user,
            role: payload.user.role?.toLowerCase().trim(), 
          }
          state.token = payload.token
        } else {
          state.user = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role?.toLowerCase().trim(), 
          }
          state.token = payload.token
        }
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer