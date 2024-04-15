import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    console.log(user);

    const handleClick = () => {
        logout();
    }

    return (
        <nav className="bg-gray-800 py-2">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div>
                    <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300">Home</Link>
                </div>
                <div className="flex items-center">
                    {user && user.username && (
                        <div className="text-white text-lg font-semibold mr-4">{user.username}</div>
                    )}
                    <button onClick={handleClick} className="text-white hover:text-gray-300 text-lg">Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
