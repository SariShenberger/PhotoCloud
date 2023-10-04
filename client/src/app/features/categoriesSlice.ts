import { createSlice } from '@reduxjs/toolkit'
import { getAllCategoriesAPI, addCategoryAPI, updateCategoryAPI, delCatregoryAPI } from '../../api/category.api'
import { Category } from '@mui/icons-material';
const initValue = {
    categories: [] as Category[],
};

const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: initValue,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesAPI.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
            .addCase(getAllCategoriesAPI.rejected, (state, action) => {
                alert(action.error.message);
            })
        builder.addCase(addCategoryAPI.fulfilled, (state, action) => {
            const category: Category = action.meta.arg;
            category.idcategory = (action.payload as any).data.idcategory;
            state.categories.push(category);
            alert("sucsses adding category");
        })
            .addCase(addCategoryAPI.rejected, (state, action) => {
                alert(action.error.message);
            })
        builder.addCase(updateCategoryAPI.fulfilled, (state, action) => {
            const findIndex = state.categories.findIndex((c: Category) => c.idcategory === action.meta.arg.idCategory);
            state.categories[findIndex].category_description = action.meta.arg.category.category_description;
            alert("sucsses update category")
        })
            .addCase(updateCategoryAPI.rejected, (state, action) => {
                alert(action.error.message);
            })
        builder.addCase(delCatregoryAPI.fulfilled, (state, action) => {
            const findIndex = state.categories.findIndex((c: Category) => c.idcategory === action.meta.arg);
            if (findIndex > -1)
                state.categories.splice(findIndex, 1);
        })
            .addCase(delCatregoryAPI.rejected, (state, action) => {
                alert(action.error.message);
            })

    },

})

export default categoriesSlice.reducer;