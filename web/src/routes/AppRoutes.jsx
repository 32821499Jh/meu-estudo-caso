import { Routes, Route } from "react-router-dom";
import ListaProdutos from "../pages/ListaProduto";
import FormProduto from "../pages/FormProduto";
import ProductDetails from "../pages/ProductDetails"; 
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListaProdutos />} />
      <Route path="/novo" element={<FormProduto />} />
      <Route path="/editar/:id" element={<FormProduto />} />
      <Route path="/product/:id" element={<ProductDetails />} /> {}
    </Routes>
  );
}