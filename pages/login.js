import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader from "../components/preloader";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

export default function Login() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formComplete, setFormComplete] = useState(true);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [btn, setBtn] = useState("Sign In");
  const [err, setErr] = useState();

  async function handleLogin(e) {
    e.preventDefault();

    if (!password || !username) {
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
      password: password,
    };

    console.log(load);
    try {
      axios({
        method: "post",
        url: "https://bundle-backend.herokuapp.com/auth/login/",
        data: JSON.stringify(load),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
          console.log(res.data);
          setBtn("Sign In");
          localStorage.setItem("token", res.data.key);
          window.location.href = "/connect";
        })
        .catch(() => {
          setHasError(true);
          setBtn("Sign In");
          setErr(
            "An error occurred while trying to login user. Check your input and try again"
          );
        });
    } catch (err) {
      console.log(err);
      setBtn("Sign In");

      setErr("An error occurred");
    }
  }

  setTimeout(() => {
    setShowPreloader(false);
  }, 5000);
  return (
    <>
      <AnimatePresence>{showPreloader ? <Preloader /> : null}</AnimatePresence>
      <div className="auth">
        <div className="auth__image-container">
          <h3>Sign In</h3>
          <Link href="/">
            <div className="auth__image">
              <Image src={AuthImage} alt="auth" width={400} height={400} />
            </div>
          </Link>
        </div>

        <div className="auth__details">
          <div className="auth__image">
            <Image src={Logo2} alt="bundle logo" width={60} height={60} />
          </div>
          <h3>Welcome back!</h3>
          <p>It’s good to have you back!</p>

          <form className="auth__form">
            <p style={{ color: "red" }}>{err}</p>
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
              className={
                formComplete ? "auth__input" : "auth__input auth__input--err"
              }
            />
            <button
              onClick={(e) => handleLogin(e)}
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
            <p>Sign in with Google</p>
          </button>

          <h6>
            Don’t have an account?{" "}
            <Link href="signup">
              <b>Sign up</b>
            </Link>
          </h6>
        </div>
      </div>
    </>
  );
}
