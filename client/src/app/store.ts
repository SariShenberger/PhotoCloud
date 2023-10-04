import { configureStore } from '@reduxjs/toolkit';
import imageSlice from './features/imageSlice';
import personSlice from './features/personSlice';
import categoriesSlice from './features/categoriesSlice'; 
import filterSlice from './features/filterSlice';

export default configureStore({
    reducer:{
      imageSlice,
      personSlice,
      categoriesSlice,
      // filterSlice,
    }
  });