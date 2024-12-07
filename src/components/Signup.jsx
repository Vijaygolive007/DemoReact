import { useEffect, useState } from "react";
import "../assets/css/Signup.css";
import { Link } from "react-router-dom";


export default function Signup() {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const combinedData=[admins,users]
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    profile: "",
    salary:0,
    jobrole:'',
  });
  //collects local storage data
  useEffect(() => {
    const savedDataAdmin = localStorage.getItem("Admins");
    if (savedDataAdmin) {
      setAdmins(JSON.parse(savedDataAdmin));
    }
  }, []);
  useEffect(() => {
    const savedDataUser = localStorage.getItem("Users");
    if (savedDataUser) {
      setUsers(JSON.parse(savedDataUser));
    }
  }, []);
  console.log(admins);
  //pattern for username and password
  const user = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
  const pwd =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Errors
  const [errors, seterrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "username is required";
    } else if (!user.test(formData.username)) {
      validationErrors.username = "Enter valid username";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!mail.test(formData.email)) {
      validationErrors.email = "Enter valid Email";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "password is required";
    } else if (!pwd.test(formData.password)) {
      validationErrors.password = "Enter valid Password";
    }
    if (formData.password !== formData.cpassword) {
      validationErrors.cpassword = "password doesnot match";
    }
    if (formData.profile == "") {
      validationErrors.profile = "choose profile";
    }
    seterrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
        console.log("Form submitted");
        if (formData.profile === 'Admin') {
            const exists = admins.some((item) => item.email === formData.email);
            if (!exists) {
                const updatedAdmins = [...admins, formData];
                setAdmins(updatedAdmins);
                localStorage.setItem('Admins', JSON.stringify(updatedAdmins));
                alert('Admin Added Continue with Signin');
            } else {
                alert('Admin with email already exists.');
            }
        } 
        else {
            const existuser = users.some((item) => item.email === formData.email);
            
            if (!existuser) {
                const updatedUsers = [...users, formData];
                setUsers(updatedUsers);
                localStorage.setItem('Users', JSON.stringify(updatedUsers));
                alert('User Added Continue with Signin');
            } else {
                alert('User with email already exists.');
            }
        }
    }
    console.log(combinedData);
};
//update value by press of key
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form className="form-signup" onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <div className=" p-2 ">
          <label htmlFor="username">Username</label>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p className="text-danger">{errors.username}</p>}
        <div className=" p-2 ">
          <label htmlFor="email">Email</label>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}

        <div className=" p-2 ">
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
        <div className=" p-2 ">
          <label htmlFor="password">Confirm Password</label>
        </div>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="Confirm password"
          value={formData.cpassword}
          onChange={handleChange}
        />
        {errors.cpassword && <p className="text-danger">{errors.cpassword}</p>}
        <div className="mt-3">
          <label className="mx-2" htmlFor="Profile">
            Choose your profile:{" "}
          </label>
          <select name="profile" id="profile" onChange={handleChange}>
            <option value="choose">choose</option>
            <option value="Admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.profile && <p className="text-danger">{errors.profile}</p>}
        </div>
        <div className=" mt-3 ">
          <button type="submit" >
            Signup
          </button>
          <Link to='/login' state={{comData:combinedData}}><button className="m-3">Signin</button></Link>
        </div>
      </form>
    </>
  );
}

