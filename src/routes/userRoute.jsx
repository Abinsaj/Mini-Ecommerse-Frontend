import { Route, Routes } from "react-router-dom";
import SignupForm from "../components/userComponents/SignupForm";
import LoginForm from "../components/userComponents/LoginForm";
import Home from "../components/userComponents/Home";
import Cart from "../components/userComponents/Cart";
import UserLoggedOut from "../services/UserService/UserLogOut";
import UserLoggedIn from "../services/UserService/UserLogIn";
import CheckoutPage from "../components/userComponents/Checkout";
import SuccessPage from "../components/userComponents/Success";

const UserRoute = () => {
    return (
        <Routes>

            <Route path="" element={<UserLoggedOut />} >
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Route>

            <Route path="" element={<UserLoggedIn />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage/>}/>
            </Route>
        </Routes>
    )
}

export default UserRoute

