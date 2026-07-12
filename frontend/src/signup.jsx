import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserauth from "./global/userauth";
import useToken from "./global/token";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [formdata, saveformdata] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const save_token = useToken((state) => state.save_token);
  const auth = useUserauth((state) => state.auth);
  const auth_true = useUserauth((state) => state.auth_true);

  useEffect(() => {
    
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    saveformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    setError("");

    if (formdata.username === "" || formdata.password === "") {
      setError("Please fill out the form");
      return;
    }

    try {
      const result = await axios.post("http://localhost:3000/auth/signup", formdata);

      if (result.status !== 200) {
        setError("Something went wrong");
        return;
      }

      
      save_token(result.data);
      auth_true();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <h2>Ready to use?</h2>
      <form onSubmit={signup}>
        <div>
          <label>Username : </label>
          <input
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <label>Password : </label>
        <input
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </>
  );
}