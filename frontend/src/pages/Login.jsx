import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful ✅");

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    // <div>
    //   <h2>Login</h2>

    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       onChange={(e) => setForm({ ...form, email: e.target.value })}
    //     />

    //     <input
    //       type="password"
    //       placeholder="Password"
    //       onChange={(e) => setForm({ ...form, password: e.target.value })}
    //     />

    //     <button type="submit">Login</button>
    //   </form>
    // </div>

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-2xl shadow-lg w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;