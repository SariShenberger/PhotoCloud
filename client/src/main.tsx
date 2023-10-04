import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, useNavigate, useNavigation, useNavigationType, } from "react-router-dom";

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Sign_in } from './components/sign_in.tsx';
import { Sign_up } from './components/sign_up.tsx';
import { AddPerson } from './components/add_person.tsx';
import { UpdatePerson } from './components/update_person.tsx';
import { ShowPersons } from './components/show_persons.tsx';
import { CheckboxPersons } from './components/checkbox_persons.tsx';
import { Home } from './components/home.tsx';
import { AddImages } from './components/add_images.tsx';
import { ShowImages } from './components/show_images.tsx';
import { AddCategory } from './components/add_category.tsx';
import { ShowAllCategories } from './components/show_all_categories.tsx';
import { UpdateImage } from './components/update_image.tsx';
import { Welcome } from './components/welcome.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    // element: <div>Hello world!</div>,
    Component: App,
    children: [
      {
        path: '',
        Component: Welcome
      },
      {
        path: 'sign-up',
        Component: Sign_up
      },
      {
        path: 'sign-in',
        Component: Sign_in
      },
      {
        path: 'home',
        Component: Home,
        children: [
          {
            path: 'show-images',
            Component: ShowImages
          },
          {
            path: 'upload-images',
            Component: AddImages
          },
          {
            path: 'add-category',
            Component: AddCategory
          },
          {
            path: 'add-person',
            Component: AddPerson
          },
          {
            path: 'show-persons',
            Component: ShowPersons
          },
          {
            path: 'show-categories',
            Component: ShowAllCategories
          },
          {
            path: 'update-image',
            Component: UpdateImage
          },



        ]
      }



    ]
  }
  // , {
  //   path: 'sign_in',
  //   element: <Sign_in />
  // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

)
