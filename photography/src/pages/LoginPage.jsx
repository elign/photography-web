import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/login", { email, password });
    } catch (e) {
      alert("login failed");
    }
  };
  return (
    <div className="grow flex items-center justify-around">
      <div className="-mt-30">
        <h1 className="text-4xl mb-8 text-center">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
        </form>
        <div className="text-center my-4 text-sm text-gray-400">
          <span>Don&#39;t have an Account yet? </span>
          <Link className="text-blue-800" to={"/register"}>
            Click to Register
          </Link>
        </div>
      </div>
    </div>
  );
}
