import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader from "../components/preloader";
import { AnimatePresence, motion } from "framer-motion";

export default function Login() {
  const [showPreloader, setShowPreloader] = useState(true);

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
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="auth__input"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="auth__input"
            />
            <button className="auth__button auth__button--login">
              Sign In
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
