import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Flikart_Page/Header/Header';
import Footer from './Components/Flikart_Page/Footer/Footer';
import Add_product from './Components/Flikart_Page/Add_product/Add_product';
import Edit_product from './Components/Flikart_Page/Edit_page/Edit_product';
import Cart_page from './Components/Flikart_page/Cart_page/Cart_product';
import Home_product from './Components/Flikart_Page/Home_page/Home_product';
import Not_found from './Components/Flikart_Page/Not_Found_page/Not_found';
import SignIn from './Components/Flikart_Page/SignlN/SignlN';
import SignUP from './Components/Flikart_Page/SignUP/SignUP';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { signINSuc } from './Services/Actions/authAction';
import My_Orders from './Components/Flikart_Page/Header/My_order/My_order';

function App() {
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(signINSuc(user));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

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
                <Route path="/order" element={<My_Orders />} />
                <Route path="/cart" element={<Cart_page />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUP />} />
                <Route path="/*" element={<Not_found />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;