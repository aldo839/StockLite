import { Routes, Route, Navigate } from "react-router-dom"
import ProductList from "./components/UI/ProductList"
import RegisterProduct from "./components/UI/RegisterProduct"
import AddProduct from "./components/UI/AddProduct"
import RemoveProduct from "./components/UI/RemoveProduct"
import History from "./components/UI/History"

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      {/* If the url is unknow, we send to /products */}
      <Route path="*" element={<Navigate to="/products" replace />} />
      <Route path="/register-product" element={<RegisterProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/remove-product" element={<RemoveProduct />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
export default App