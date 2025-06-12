import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header_page/Header';
import { Route, Routes } from 'react-router-dom';
import AddRecipe from './Components/AddRecipe_page/AddRecipe';
import EditRecipe from './Components/Edit_page/EditRecipe';

function App() {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/add" element={<AddRecipe />} />
                <Route path="/edit/:id" element={<EditRecipe />} />
            </Routes>
        </>
    )
}

export default App;