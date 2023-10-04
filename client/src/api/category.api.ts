import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";

export const getAllCategoriesAPI =createAsyncThunk("getAllCategoriesAPI", async () => {
   // try{
     return (await axios.get(`${config.api}category`)).data
   // }
   // catch(e:any){
   //    alert(e.response.data.message);
   // }
})
  


export const addCategoryAPI = createAsyncThunk("addCategoryAPI",async (category: Category)  => 
   await axios.post(`${config.api}category`, category)
)

export const updateCategoryAPI =createAsyncThunk("updateCategoryAPI", async (obj:{idCategory: number, category: Category}) => 
 await axios.patch(`${config.api}category/${obj.idCategory}`, obj.category)
)

export const delCatregoryAPI = createAsyncThunk("delCatregoryAPI",async (idCategory: number) => {
   return await axios.delete(`${config.api}category/${idCategory}`)
}
  
)


