import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import cookies from "nookies";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import { validateEmail } from "../utils/validators/validateEmail";
import { validateRequired } from "../utils/validators/validateRequired";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;

    if (validateRequired(password) || !validateEmail(email)) {
      return;
    }

    try {
      const res = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signin",
        {
          ...signinInfo,
        }
      );
      cookies.set(null, "token", res.data.token, { path: "/" });

      const { plannedRoute } = cookies.get();
      let plannedRouteParsed = plannedRoute.as && JSON.parse(plannedRoute);

      const plannedHrefRoute = plannedRouteParsed
        ? plannedRouteParsed.href
        : "/[country]";
      const plannedAsRoute = plannedRouteParsed ? plannedRouteParsed.as : "/us";

      console.log({ plannedRouteParsed, plannedAsRoute, plannedHrefRoute });

      router.replace(plannedHrefRoute, plannedAsRoute);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <CustomInput
          name="email"
          placeholder="Enter your email"
          value={signinInfo.email}
          onChange={handleInput}
          onBlur={validateEmail}
        />
        <CustomInput
          name="password"
          type="password"
          placeholder="Enter your password"
          value={signinInfo.password}
          onChange={handleInput}
        />

        {error && <div className="error">{error}</div>}

        <Link href="/signup">
          <a>Create an account</a>
        </Link>

        <button
          disabled={
            validateRequired(signinInfo.password) ||
            !validateEmail(signinInfo.email)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
