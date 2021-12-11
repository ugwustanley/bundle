import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";

export default function Login() {
  return (
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
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            className="auth__input"
          />
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
          <input
            type="password"
            placeholder="Verify Password"
            className="auth__input"
          />
          <button className="auth__button auth__button--login">Sign Up</button>
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
  );
}
