import { useState, useEffect } from "react";
import image from "../assets/user.webp";
import "../assets/css/Admin.css";
import { useLocation } from "react-router-dom";

export const Admin = () => {
  const location = useLocation();
  const { state } = location || {};
  const { combineData } = state || { combineData: [] };

  const admin = combineData[0] || {};

  const initialUsers =
    JSON.parse(localStorage.getItem("Users")) || combineData[1] || [];

  // State to manage users
  const [users, setUsers] = useState(initialUsers);

  // State to track edits
  const [editData, setEditData] = useState({});

  // Update local storage whenever users state changes
  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(users));
  }, [users]);

  // Handle input change and track temporary edits
  const handleInputChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  // Handle update functionality
  const handleUpdate = (index) => {
    const updatedUsers = [...users];
    if (editData[index]) {
      updatedUsers[index] = { ...updatedUsers[index], ...editData[index] };
      setUsers(updatedUsers);
      localStorage.setItem("Users", JSON.stringify(updatedUsers)); // Update local storage
      setEditData((prev) => {
        const updatedEditData = { ...prev };
        delete updatedEditData[index];
        return updatedEditData;
      });
    }
  };


  // Handle delete functionality
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("Users", JSON.stringify(updatedUsers)); // Update local storage
  };

  return (
    <>
      <h1>
        Welcome Admin {admin.username} <img src={image} alt="logo" />
      </h1>
      <p>{admin.email}</p>
      <h1>Users Data Table</h1>
      <table border="2" style={{ width: "95%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Job Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td className="username">{item.username}</td>
              <td className="email">{item.email}</td>
              <td>
                <input className="input"
                  type="text"
                  value={
                    (editData[index] && editData[index].jobrole) || item.jobrole || ""
                  }
                  onChange={(e) =>
                    handleInputChange(index, "jobrole", e.target.value)
                  }
                  placeholder="Enter Job Role"
                />
              </td>
              <td>
                <input className="input"
                  type="number"
                  value={
                    (editData[index] && editData[index].salary) || item.salary || ""
                  }
                  onChange={(e) =>
                    handleInputChange(index, "salary", e.target.value)
                  }
                  placeholder="Enter Salary"
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

