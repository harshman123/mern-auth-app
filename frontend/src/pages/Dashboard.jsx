import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await API.get("/auth/profile");
        setData(res.data);
      } catch (err) {
        console.log("Access denied ❌");
      }
    };

    fetchProtected();
  }, []);

  return (
    // <div>
    //   <h1>Dashboard 🔐</h1>

    //   {data ? (
    //     <>
    //       <p>{data.message}</p>
    //       <p>User ID: {data.userId}</p>
    //     </>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
      
    // </div>

     <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard 🔐</h1>

      {data ? (
        <div className="bg-white p-4 rounded shadow">
          <p>{data.message}</p>
          <p className="text-gray-500">User ID: {data.userId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>

  );
}

export default Dashboard;