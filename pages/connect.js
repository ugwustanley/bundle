import React, { useState, useCallback, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "../images/auth.svg";
import Logo2 from "../images/logo-2.svg";
import Google from "../images/icons/Google Icon.svg";
import Preloader from "../components/preloader";
import { AnimatePresence, motion } from "framer-motion";
import { TransContext } from "../context/transContext";
import axios from "axios";
import MonoConnect from "@mono.co/connect.js";

export default function Connect() {
  const [trans, setTrans] = useContext(TransContext);
  console.log(trans, "trans");
  const [showPreloader, setShowPreloader] = useState(true);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(true);
  const [name, setName] = useState("");
  const [btn, setBtn] = useState("Connect Account");
  const [code, setCode] = useState("");
  const [err, setErr] = useState();
  const [acc, setAcc] = useState();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(async () => {
    if (code.length >= 3) {
      let load = {
        mono_id: code,
        account_name: name,
      };
      setShowPreloader(true);
      try {
        setBtn("Please wait...");
        const key = localStorage.getItem("token");
        const auth = `token${" "}${key}`;
        console.log(auth, key);
        const request1 = await axios({
          method: "post",
          url: "https://bundle-backend.herokuapp.com/connect/monoid/",
          data: JSON.stringify(load),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
        });

        if (request1) {
          console.log(request1, "request1 just came back");
          const request2 = await axios({
            method: "get",
            url: "https://bundle-backend.herokuapp.com/connect/monoid/",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          });

          if (request2) {
            const load = {
              mono_id: code,
              //request2.data[0].mono_id,
            };
            console.log(request2, "request2 just came back");
            setAcc({ accounts: request2.data });
            localStorage.setItem("accounts", JSON.stringify(request2.data));
            const request3 = await axios({
              method: "post",
              url: "https://bundle-backend.herokuapp.com/connect/transactions/",
              data: JSON.stringify(load),
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
              },
            });
            if (request3) {
              console.log(request3, "request3 just came back");
              setTrans({ ...acc, transactions: request3.data.data.data });
              localStorage.setItem(
                "transactions",
                JSON.stringify(request3.data.data.data)
              );
              console.log(typeof request3.data.data.data, "transactions");
              window.location.href = "/dashboard/statement"
              setTimeout(() => {setShowPreloader(false);} , 3000)
            }
          }
        }
      } catch (err) {
        console.log(err);
        setBtn("Connect Account");

        setErr("An error occurred");
      }
    }
  }, [code]);

  const openMonoWidget = useCallback(async () => {
    const MonoConnect = (await import("@mono.co/connect.js")).default;

    const monoInstance = new MonoConnect({
      key: "test_pk_C4Besc1jIOs27aQwgBBt",
      onClose: () => {
        console.log("widget closed");
      },
      onLoad: () => console.log("widget loaded"),
      onSuccess: ({ code }) => {
        setCode(code), console.log(code);
      },
    });

    monoInstance.setup();
    monoInstance.open();
  }, []);

  //"test_pk_C4Besc1jIOs27aQwgBBt"
  async function handleConnect(e) {
    e.preventDefault();

    if (!name) {
      setErr("Incomplete Input");
      setFormComplete(false);
      return;
    }
    await openMonoWidget();
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
