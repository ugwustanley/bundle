import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.svg";
import { motion } from "framer-motion";

export default function Navbar({ showNav, setShowNav }) {
  return (
    <>
      <nav className={showNav ? `nav static-nav` : `nav`}>
        <div className="nav__logo">
          <Image src={Logo} alt="logo" />
        </div>

        <div className="nav__link-container">
          <ul className="nav__links">
            <li className="nav__link nav__link--stories">
              <Link href="./#">
                <a>Stories</a>
              </Link>
            </li>
            <li className="nav__link nav__link--faq">
              <Link href="./#">
                <a>FAGs</a>
              </Link>
            </li>
            <li className="nav__link nav__link--sign-in">
              <Link href="./login">
                <button>Sign in</button>
              </Link>
            </li>
            <li className="nav__link nav__link--sign-up">
              <Link href="./signup">
                <button>Sign up</button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu__bar">
          <button
            onClick={() => {
              setShowNav(!showNav);
              console.log(showNav);
            }}
          >
            <motion.div
             animate={showNav ? { rotate:`45deg`,width:30,x:0,y:3}: null }
             transition={{ duration: 0.3 , ease:'linear'}}
             className="menu__stroke menu__stroke--one"></motion.div>
            <motion.div
             animate={showNav ? { opacity:0}: null }
             transition={{ duration: 0.3 }}
             className="menu__stroke menu__stroke--two"></motion.div>
            <motion.div 
            animate={showNav ? { rotate:`-45deg`,width:30,x:-1,y:-9}: null }
            transition={{ duration: 0.3 , ease:'linear'}}
            className="menu__stroke menu__stroke--three"></motion.div>
          </button>
        </div>
      </nav>

      <motion.div
        // // initial={showNav ? { x: "0vw", opacity: 0.5 } : null}
        // animate={showNav ? { x: "-100vw", opacity: 1 } : null }
        // transition={{ duration: 0.3 , ease:'linear'}}
        className={showNav? `mobile-nav__link-container mobile-nav--active`: `mobile-nav__link-container  mobile-nav--hidden`}
      >
        <ul className="mobile-nav__links">
          <li className="mobile-nav__link mobile-nav__link--stories">
            <Link href="./#">
              <a>Stories</a>
            </Link>
          </li>
          <li className="mobile-nav__link mobile-nav__link--faq">
            <Link href="./#">
              <a>FAGs</a>
            </Link>
          </li>
          <li className="mobile-nav__link mobile-nav__link--sign-in">
            <Link href="./login">
              <button>Sign in</button>
            </Link>
          </li>
          <li className="mobile-nav__link mobile-nav__link--sign-up">
            <Link href="./signup">
              <button>Sign up</button>
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
}
