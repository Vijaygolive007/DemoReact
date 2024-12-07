import { useState } from "react";
import "../assets/css/Signup.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state for form inputs and messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Get data passed from Signup component
  const { state } = location;
  const { comData } = state || { comData: [] };
  const admins = comData[0] || [];
  const users = comData[1] || [];

  console.log("Admins:", admins);
  console.log("Users:", users);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setMessage({ type: "error", text: "Email and password are required." });
      return;
    }

    // Check for Admin or User
    
    const admin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate("/userdashboard", { state: { user} })
      console.log(user)
    } else if (admin) {
      const combineData=[admin,users]
      navigate("/admin", { state: {combineData} })

      console.log(combineData)
      console.log(admin)
    } else {
      setMessage({ type: "error", text: "Invalid email or password." });
    }
  };

  return (
    <div className="form-signup">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter registered email"
          value={formData.email}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="p-2">
          <button type="submit">Log In</button>
        </div>
      </form>

      {/* Display Messages */}
      {message.text && (
        <p
          style={{
            color: message.type === "error" ? "red" : "green",
            marginTop: "10px",
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

