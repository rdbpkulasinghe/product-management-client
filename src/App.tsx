import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCreate from './productcreate'; 
import ProductUpdate from './productupdate'; 
import Product from './product';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product/>}></Route>
        <Route path='/create' element={<ProductCreate/>}></Route>
        <Route path='/update/:id' element={<ProductUpdate/>}></Route>
      </Routes>
      </BrowserRouter>
    </div> 
  )
}

export default App
