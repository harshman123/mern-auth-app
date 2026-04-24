import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // <nav style={{ display: "flex", gap: "10px" }}>
    //   <Link to="/">Signup</Link>
    //   <Link to="/login">Login</Link>
    //   <Link to="/dashboard">Dashboard</Link>

    //   {token && (
    //     <button onClick={handleLogout}>Logout</button>
    //   )}
    // </nav>

    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Auth App</h1>

      <div className="flex gap-4">
        <Link to="/">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>

        {token && (
          <button onClick={handleLogout} className="bg-red-500 px-2 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;