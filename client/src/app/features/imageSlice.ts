import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addImageAPI, deleteImageAPI, getImagesAPI, updateImageAPI } from "../../api/image.api"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const initValue = {
  images: [] as Image[],
  filterImgBy: '',
  filterImages: [] as Image[]
}

const compatibleFiltering = (img: Image, filterBy: string) =>
(img.image_name.includes(filterBy) ||
  img.category?.category_description.includes(filterBy) ||
  img._.find((person) => person.person_name.includes(filterBy)))


const imageSlice = createSlice({
  name: "images",
  initialState: initValue,
  reducers: {
    filter: (state, action) => {
      state.filterImgBy = action.payload.filterImgBy;
      state.filterImages = state.images.filter((img) => (
        compatibleFiltering(img, state.filterImgBy)
      ))

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImagesAPI.fulfilled, (state, action) => {
        state.images = action.payload;
        (action.payload as any).filterImgBy = state.filterImgBy;
        imageSlice.caseReducers.filter(state, action);
        console.log("sucsses get image");
      })
      .addCase(getImagesAPI.rejected, (state, action) => {
        alert(action.error.message);
      })
    builder.addCase(addImageAPI.fulfilled, (state, action) => {
      const image: Image = action.meta.arg;
      image.idimage = (action.payload as any).data.idimage;
      state.images.push(image);
      compatibleFiltering(image, state.filterImgBy)
      state.filterImages.push()
      alert("sucsses added image");
    })
      .addCase(addImageAPI.rejected, (state, action) => {
        alert(action.error.message);
      })
    builder.addCase(updateImageAPI.fulfilled, (state, action) => {
      const image: Image = action.meta.arg.image;
      image.idimage = action.meta.arg.id;
      const findIndex = state.images.findIndex((img: Image) => img.idimage === image.idimage);
      state.images[findIndex] = image;
      (action.payload as any).filterImgBy = state.filterImgBy;
      imageSlice.caseReducers.filter(state, action);
      alert("sucsses update image");
    })
      .addCase(updateImageAPI.rejected, (state, action) => {
        alert(action.error.message);
      })
    builder.addCase(deleteImageAPI.fulfilled, (state, action) => {
      const findIndex = state.images.findIndex((img: Image) => img.idimage === action.meta.arg);
      state.images.splice(findIndex, 1);
      (action.payload as any).filterImgBy = state.filterImgBy;
      imageSlice.caseReducers.filter(state, action);
      alert("sucsses deleted image");

    })
      .addCase(deleteImageAPI.rejected, (state, action) => {
        alert(action.error.message);
      })


  },

})
export const { filter } = imageSlice.actions
export default imageSlice.reducer;