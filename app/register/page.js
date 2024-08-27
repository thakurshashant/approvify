import RegisterForm from "../ui/register-form";
import Navbar from "../ui/navbar";

export default function Page(){
    return (
        <div>
            <Navbar/>
            <div className="overflow-hidden flex flex-col item-center">
            <RegisterForm/>
            </div>
        </div>
    )
}