import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import api from "../../api";

export default function SignIn() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signin", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      alert("Signed in successfully!");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
