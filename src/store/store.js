import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'

//Instancia del store de redux con los reducers de auth y journal 

export default configureStore({

  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
})