import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import Products from './components/Products';
import AddProducts from './components/AddProducts';
import Register from './components/Register';
import Bill from './components/Bill';
import Navigationbar from './components/Navigationbar';
import BillingPage from './components/BillingPage';
function App() {
    const [cartProducts,setCartProducts]=useState([])
    const [admin,setAdmin]=useState(false);
    const [currentUser,setCurrentUser]=useState("");
    {/*Router*/}
    const router=createBrowserRouter([
        {
            path:"/",
            element:<Root/>,
            children:[
                {
                   path:"/",
                   element:<Login setCurrentUser={setCurrentUser} />
                },
                {
                    path:"/admin",
                    element:<AdminLogin admin={admin} setAdmin={setAdmin}/>
                },
                {
                    path:"/products",
                    element:<Products admin={admin} setCurrentUser={setCurrentUser} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                },
                {
                    path:"/addproducts",
                    element:< AddProducts />
                },
                {
                    path:'/register',
                    element:<Register/>
                },
                {
                    path:'/navigationBar',
                    element:<Navigationbar/>
                },
                {
                   path:"/bill",
                   
                   element:<Bill cartProducts={cartProducts} setCurrentUser={setCurrentUser}/> 
                },
                {
                   path:"/billpage",
                   element:<BillingPage currentUser={currentUser} setCurrentUser={setCurrentUser} cartProducts={cartProducts} setCartProducts={setCartProducts} /> 
                }
            ]
        }
    ]);

  return (
    <div className='App container'>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App