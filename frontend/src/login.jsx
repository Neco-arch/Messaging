import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserauth from "./global/userauth";
import useToken from "./global/token";
import axios from "axios";

export default function Loginpage() {
  const navigate = useNavigate();
  const [formdata, saveformdata] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (formdata.username === "" || formdata.password === "") {
      setError("Please fill out the form");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post("http://localhost:3000/auth/login", formdata);

      const token = result.data;
      if (!token) {
        setError("Login response did not include a token");
        return;
      }

      save_token(token);
      auth_true();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Welcome back, please log in</h2>
      <form onSubmit={login}>
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
        <div>
          <label>Password : </label>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>
    </>
  );
}