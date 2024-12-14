import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAdmin:false,
        loader:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.loader=false
        },
        unsetUser:(state)=>{
            state.user=null
            state.loader=false

        }

    }
})

export const {setUser,unsetUser}=authSlice.actions


export default authSlice