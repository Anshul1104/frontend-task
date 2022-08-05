import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import AddProduct from './pages/Products/AddProduct/AddProduct';
import ProductDetail from './pages/Products/ProductDetail/ProductDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="flex justify-between">
          <p className="font-bold">
            <Link to="/">UPayments Store</Link>
          </p>
          <p className="font-bold">Register</p>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard />
          }
        />
        <Route path={`/product-detail/:id`} element={<ProductDetail />} />
        <Route path="/create-product" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
