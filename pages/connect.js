import { useState , useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader from "../components/preloader";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import MonoConnect from '@mono.co/connect.js';



export default function Connect() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState()
  const [btn, setBtn] = useState("Connect Account");
  const [err, setErr] = useState();

  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: ({ code }) => console.log(`Linked successfully: ${code}`),
      key: "test_pk_C4Besc1jIOs27aQwgBBt"
      
    })

    monoInstance.setup()
    
    return monoInstance;
  }, [])

  async function handleConnect(e) {
    e.preventDefault();

    if (!name) {
        setErr("Incomplete Input");
        setFormComplete(false);
        return;
      }
      monoConnect.open()
    // setBtn("Please wait...");
    // const load = {
    //   username: '',
    //   password: '',
    // };

    // console.log(load);
    // try {

    //   axios({
    //     method: "post",
    //     url: "https://bundle-backend.herokuapp.com/auth/login/",
    //     data: JSON.stringify(load),
    //     headers: { "Content-Type": "application/json" },
    //   })

    //     .then((res) => {
    //       setResponse(res.data);
    //       setLoading(false);
    //       console.log(res.data);
    //       setBtn("Sign In");
    //       window.location.href = "/dashboard/statement";
    //     })
    //     .catch(() => {
    //       setHasError(true);
    //       setLoading(false);
    //       setBtn("Sign In");
    //     });
    // } catch (err) {
    //   console.log(err);
    //   setBtn("Sign In");

    //   setErr("An error occurred");
    // }
  }

  setTimeout(() => {
    setShowPreloader(false);
  }, 5000);
  return (
    <>
      <AnimatePresence>{showPreloader ? <Preloader /> : null}</AnimatePresence>
      <div className="auth">
        <div className="auth__image-container">
          <h3>Connect Account</h3>
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
          <h3>Just this last part.</h3>
          <p>Connect your bank account</p>

          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Set Account Name"
            name="username"
            className={
              formComplete ? "auth__input" : "auth__input auth__input--err"
            }
          />
          <button
            onClick={(e) => handleConnect(e)}
            className="auth__button auth__button--login"
          >
            {btn}
          </button>
        </div>
      </div>
    </>
  );
}
