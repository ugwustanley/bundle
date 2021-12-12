import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader from "../components/preloader";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
// import UseFetch from "../help/fetch";

export default function Signup() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [formComplete, setFormComplete] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [btn, setBtn] = useState("Sign Up");
  const [err, setErr] = useState();

  async function handleRegister(e) {
    e.preventDefault();

    if (!email || !password || !fullName || !username || !password2) {
      setErr("Incomplete Input");
      setFormComplete(false);
      return;
    }

    if (password.length < 8) {
      setErr("Password Length Must Be Up To Eight Characters ");
      return;
    }
    setFormComplete(true);
    setBtn("Please wait...");
    const load = {
      username: username,
      email: email,
      password1: password,
      password2: password2,
    };
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };
    console.log(load);
    try {
      axios({
        method: "POST",
        headers: headers,
        url: `https://bundle-backend.herokuapp.com/auth/registration`,
        data: JSON.stringify(load),
      })
        // .post(`https://bundle-backend.herokuapp.com/auth/registration`, {
        //   params: JSON.stringify(load),
        //   headers: headers,
        // })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
          console.log(res.data);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setBtn("SignUp");

      setErr("An error occurred");
    }
  }

  setTimeout(() => {
    setShowPreloader(false);
  }, 5000);

  return (
    <>
      {/* <AnimatePresence>{showPreloader ? <Preloader /> : null}</AnimatePresence> */}
      <div className="auth">
        <div className="auth__image-container">
          <h3>Sign Up</h3>
          <div className="auth__image">
            <Image src={AuthImage} alt="auth" width={400} height={400} />
          </div>
        </div>

        <div className="auth__details">
          <Link href="/">
            <div className="auth__image">
              <Image src={Logo2} alt="bundle logo" width={60} height={60} />
            </div>
          </Link>
          <h3>Welcome to Bundle!</h3>
          <p>We are very excited you are joining us!</p>

          <form className="auth__form">
            <p style={{ color: "red" }}>{err}</p>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              name="name"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              name="username"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              name="email"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <input
              onChange={(e) => setPassword2(e.target.value)}
              type="password"
              placeholder="Verify Password"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <button
              onClick={(e) => handleRegister(e)}
              className="auth__button auth__button--login"
            >
              {btn}
            </button>
          </form>

          <div className="auth__line"></div>
          <h5 className="auth__or">or</h5>

          <button className="auth__button auth__button--google">
            <div className="google__icon">
              <Image src={Google} alt="google icon" width={25} height={25} />{" "}
            </div>
            <p>Sign up with Google</p>
          </button>

          <h6>
            Already have an account?{" "}
            <Link href="login">
              <b>Sign in</b>
            </Link>
          </h6>
        </div>
      </div>
    </>
  );
}
