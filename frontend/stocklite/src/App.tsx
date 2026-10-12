import { Routes, Route, Navigate } from "react-router-dom"
import ProductList from "./components/pages/ProductList"
import RegisterProduct from "./components/pages/RegisterProduct"
import AddProduct from "./components/pages/AddProduct"
import RemoveProduct from "./components/pages/RemoveProduct"
import History from "./components/pages/History"
import Dashboard from "./components/pages/Dashboard"
import EditProduct from "./components/pages/EditProduct"
import DeleteProduct from "./components/pages/DeleteProduct"

function App() {

  return (

    <Routes>

      <Route path="/dashboard" element={<Dashboard />} />
      {/* If the url is unknow, we send to /dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/register-product" element={<RegisterProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/remove-product" element={<RemoveProduct />} />
      <Route path="/history" element={<History />} />
      <Route path="/products/:id/edit" element={<EditProduct />} />
      <Route path="/products/:id/delete" element={<DeleteProduct />} />

    </Routes>

  )
  
}
export default App