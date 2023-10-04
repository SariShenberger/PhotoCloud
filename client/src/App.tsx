import { useEffect } from 'react'
import './App.css'
import { upload } from './firebase/upload-fiels/storage_upload_file'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import React, { useState } from 'react';
import 'firebase/storage';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // navigate('/sign_in');
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);
    upload(file);

  };


  return (
    <Provider store={store}>
      <div>
        <video playsInline autoPlay muted loop src="../src/assets/filmCut.mp4"/>
        <Outlet />
      </div>
    </Provider>
  );
};

export default App;