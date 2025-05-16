import './App.css'
import Hospital_management from './Components/Hospital_management'
import { Route, Routes } from 'react-router-dom';
import Hospital_header from './Components/Header';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Hospital_header />} />
                <Route path="/hospital_management" element={<Hospital_management />} />
            </Routes>
        </>
    )
}

export default App