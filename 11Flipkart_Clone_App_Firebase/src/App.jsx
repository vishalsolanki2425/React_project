import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Flikart_Page/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Add_product from './Components/Flikart_Page/Add_product/Add_product';
import Edit_product from './Components/Flikart_page/Edit_page/Edit_product';
import Cart_page from './Components/Flikart_page/Cart_page/Cart_product';
import Home_product from './Components/Flikart_Page/Home_page/Home_product';
import { useState } from 'react';
import Not_found from './Components/Flikart_Page/Not_Found_page/Not_found';

function App() {

    const [globalSearchTerm, setGlobalSearchTerm] = useState('');

    const handleSearchFromHeader = (term) => {
        setGlobalSearchTerm(term);
    };

    return (
        <>
            <Header onSearch={handleSearchFromHeader} currentSearchTerm={globalSearchTerm} />
            <Routes>
                <Route path="/" element={<Home_product searchTerm={globalSearchTerm} />} />
                <Route path="/add" element={<Add_product />} />
                <Route path="/edit/:id" element={<Edit_product />} />
                <Route path="/cart" element={<Cart_page />} />
                <Route path="/*" element={<Not_found />} />
            </Routes>
        </>
    );
}

export default App;