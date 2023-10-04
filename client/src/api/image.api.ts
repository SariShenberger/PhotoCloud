import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import config from "../config";

export const getImagesAPI = createAsyncThunk("getImagesAPI", async (): Promise<Image[]> =>

    (await axios.get(`${config.api}image`)).data
)



export const addImageAPI = createAsyncThunk("addImageAPI", async (image: Image) => 
         (await axios.post(`${config.api}image`, image))
)

export const updateImageAPI = createAsyncThunk("updateImageAPI", async (obj:{id:number,image: Image}) => 
         (await axios.patch(`${config.api}image/${obj.id}`, obj.image))
)

export const deleteImageAPI = createAsyncThunk("deleteImageAPI", async (id: number) => {
    console.log(id)
   const res= (await axios.delete(`${config.api}image/${id}`));
   console.log(res, id);
   return res;
}
         
)

