import { Route,Routes } from "react-router-dom";
import SignupForm from "../components/userComponents/SignupForm";
import LoginForm from "../components/userComponents/LoginForm";
import Home from "../components/userComponents/Home";
import Cart from "../components/userComponents/Cart";

const UserRoute = ()=>{
    return (
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    )
}

export default UserRoute

