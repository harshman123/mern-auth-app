import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({name: "", email: "", password: "" });

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); 

    try {
      const res = await API.post("/auth/signup", form);
      alert("Signup successful ✅");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    // <div className="bg-green-500">
    //   <h2 className="text-2xl font-bold mb- text-yellow-800">Signup</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       onChange={(e) => setForm({ ...form, name: e.target.value })}
    //     />

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

    //     <button type="submit">Signup</button>
    //   </form>
    // </div>

     <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;