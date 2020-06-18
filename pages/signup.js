import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import cookies from "nookies";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { validateEmail } from "../utils/validators/validateEmail";
import { validateRequired } from "../utils/validators/validateRequired";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name } = signupInfo;

    if (
      validateRequired(password) ||
      !validateEmail(email) ||
      validateRequired(name)
    ) {
      return;
    }

    try {
      const res = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signup",
        {
          ...signupInfo,
        }
      );
      cookies.set(null, "token", res.data.token, { path: "/" });
      router.replace("/[country]", "/us");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <CustomInput
          name="name"
          placeholder="Enter your name"
          value={signupInfo.name}
          onChange={handleInput}
        />
        <CustomInput
          name="email"
          placeholder="Enter your email"
          value={signupInfo.email}
          onChange={handleInput}
          onBlur={validateEmail}
        />
        <CustomInput
          name="password"
          type="password"
          placeholder="Enter your password"
          value={signupInfo.password}
          onChange={handleInput}
        />

        {error && <div className="error">{error}</div>}

        <Link href="/signin">
          <a>Already have an account?</a>
        </Link>

        <button
          disabled={
            validateRequired(signupInfo.password) ||
            !validateEmail(signupInfo.email)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
