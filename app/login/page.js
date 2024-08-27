import Navbar from "../ui/navbar";
import LoginForm from "../ui/login-form";

export default function Page(){
    return (
        <div>
        <Navbar/>
        <div className="flex flex-col item-center">
        <LoginForm/>
        </div>
    </div>
    )
}