import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TUSER = {
  email: string;
  password: string;
};
export default function Login() {
  const [values, setValues] = useState<TUSER>({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((res) => {
        if (res.data.loginStatus) {
          console.log(res);
          navigate("/dashboard");
        } else {
          // login failed - show error message
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen bg-black w-full justify-center items-center border-2 border-cyan-900">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 rounded-2xl p-6 min-w-96 flex flex-col gap-4"
        >
          {error && <h1 className="text-yellow-600">{error}</h1>}
          <h1 className="text-3xl text-center text-white font-semibold ">
            Login Page
          </h1>
          <div>
            <label className="block text-sm/6 font-medium text-white">
              Username
            </label>
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                type="email"
                name="email"
                placeholder="your email"
                className="bg-transparent py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-white">
              Password
            </label>
            <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
              <input
                id="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                type="password"
                name="password"
                placeholder="your password"
                className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-8 cursor-pointer py-1.5 rounded-md bg-gray-800 text-gray-100"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
