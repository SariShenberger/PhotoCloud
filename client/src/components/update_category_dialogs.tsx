import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateCategoryAPI } from '../api/category.api';
import { AnyAction } from '@reduxjs/toolkit';
import { getImagesAPI } from '../api/image.api';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const UpdateCategoryDialogs = (props: any) => {
  const [newCategoryDescription, setNewCategoryDescription] = useState(props.category.category_description);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  // const c:Category={idcategory:2,category_description:"bla"};
  // props.setCategory(c);

  const handleClickOpen = () => {
     
    setNewCategoryDescription(props.category.category_description);
    setOpen(true);
  };
  const handleClose = async () => {
    const newCategory: Category = {
      category_description: newCategoryDescription
    }
    const obj = {
      idCategory: props.category.idcategory,
      category: newCategory
    }
    
    await dispatch(updateCategoryAPI(obj) as unknown as AnyAction);
    dispatch(getImagesAPI() as unknown as AnyAction);
    setOpen(false);

    if (props.setCategory){
      newCategory.idcategory=props.category.idcategory;
      console.log("category:",newCategory);
      props.setCategory(newCategory);
    }
  };



  return (
    <div>
      <button title="edit" className="btn" onClick={handleClickOpen}>
        <i className="bi bi-pencil-square"></i>
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          update category
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="form-floating mb-3 mt-3 w-30vw">
            <input type="text" className="form-control"
              placeholder="enter new category" required name="category_description"
              value={newCategoryDescription} onChange={(event) => setNewCategoryDescription(event.target.value)} />
            <label htmlFor="category_description">update category</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}