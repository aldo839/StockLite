import { Routes, Route, Navigate } from "react-router-dom"
import ProductList from "./components/pages/ProductList"
import RegisterProduct from "./components/pages/RegisterProduct"
import AddProduct from "./components/pages/AddProduct"
import RemoveProduct from "./components/pages/RemoveProduct"
import History from "./components/pages/History"
import Dashboard from "./components/pages/Dashboard"
import EditProduct from "./components/pages/EditProduct"
import DeleteProduct from "./components/pages/DeleteProduct"
import Login from "./components/pages/Login"
import Home from "./components/pages/Hero"
import RegisterUser from "./components/pages/RegisterUser"
import RegisterCategory from "./components/pages/RegisterCategory"
import RequireAuth from "./components/UI/RequireAuth"
import Unauthorized from "./components/pages/Unauthorized"
import NotFound from "./components/pages/NotFound"
import ActivateAccount from "./components/pages/ActivateAccount"
import BadRequest from "./components/pages/BadRequest"
import InternalServerError from "./components/pages/InternalServerError"

function App() {

  return (

    <Routes>

      {/* <Route path="/*" element={<Layout />}> */}

        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/register-category" element={<RegisterCategory />} />
        <Route path="/400" element={<BadRequest />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/500" element={<InternalServerError />} />
        <Route path="/404" element={<NotFound />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* If the url is unknow, we send to /dashboard */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/register-product" element={<RegisterProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/remove-product" element={<RemoveProduct />} />
          <Route path="/history" element={<History />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id/delete" element={<DeleteProduct />} />
        </Route>

      {/* </Route> */}

    </Routes>

  )
  
}
export default App