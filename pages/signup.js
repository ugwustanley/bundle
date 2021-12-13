import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader2 from "../components/preloader2";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Signup() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [formComplete, setFormComplete] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [username, setUsername] = useState();
  const [btn, setBtn] = useState("Sign Up");
  const [err, setErr] = useState();

  async function handleRegister(e) {
    e.preventDefault();

    if (!email || !password || !username || !password2) {
      setErr("Incomplete Input");
      setFormComplete(false);
      return;
    }
    if (password !== password2) {
      setErr("The two password do not match");
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

    console.log(load);
    try {
      axios({
        method: "post",
        url: "https://bundle-backend.herokuapp.com/auth/registration/",
        data: JSON.stringify(load),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          setBtn("Sign Up");
          setResponse(res.data);
          setLoading(false);
          console.log(res.data);
          window.location.href = "/login";
        })
        .catch(() => {
          setBtn("Sign Up");
          setErr(
            "An error occurred, check your input and try again. Password must be complex containing letters, numbers and special characters alike"
          );
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setBtn("Sign Up");
      setErr("An error occurred");
    }
  }

  setTimeout(() => {
    setShowPreloader(false);
  }, 1300);

  return (
    <>
      <AnimatePresence>{showPreloader ? <Preloader2 /> : null}</AnimatePresence>
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
