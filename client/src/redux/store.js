import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/auth.js'

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer
    }
})

