import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    loggedIn: boolean
    sidebar: boolean
    users: UserProps[]
}

const initialState: CounterState = {
    loggedIn: false,
    sidebar: false,
    users: [],
}

export interface UserProps {
    accountBalance: string
    accountNumber: string
    createdAt: string
    education: { [key: string]: any }
    email: string
    guarantor: { [key: string]: any }
    id: string
    lastActiveDate: string
    orgName: string
    phoneNumber: string
    profile: { [key: string]: any }
    socials: { [key: string]: any }
    userName: string
}

export const getUsers = createAsyncThunk("getUsers", async (data, thunkAPI) => {
    try {
        let response = await fetch(
            "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
        )
        return response.json()
    } catch (error) {
        return thunkAPI.rejectWithValue(true)
    }
})

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true
        },
        openSidebar: (state) => {
            state.sidebar = true
        },
        closeSidebar: (state) => {
            state.sidebar = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(getUsers.rejected, () => {
                alert("Server error")
            })
    },
})

export const { login, openSidebar, closeSidebar } = userReducer.actions

export default userReducer.reducer
