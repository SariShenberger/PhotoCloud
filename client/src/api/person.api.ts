import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios"
import config from "../config"

export const getPersonsAPI =createAsyncThunk("getPersonsAPI", async (): Promise<Person[]> => 
  
       ( await axios.get(`${config.api}person`)).data
)
    
export const addPersonAPI = createAsyncThunk("addPersonAPI",async (newPerson: Person) => 

     await axios.post(`${config.api}person`, newPerson)
)

export const updatePersonAPI = createAsyncThunk("updatePersonAPI", async (obj:{idperson: number, newPerson: Person}) => 

     await axios.patch(`${config.api}person/${obj.idperson}`, obj.newPerson)
)

export const deletePersonAPI =createAsyncThunk("deletePersonAPI", async (idperson: number) => 

     await axios.delete(`${config.api}person/${idperson}`)
)

