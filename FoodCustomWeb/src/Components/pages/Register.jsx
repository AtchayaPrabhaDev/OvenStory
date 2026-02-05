import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !address) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await registerUser({
        username,
        password,
        address,
      });

      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
