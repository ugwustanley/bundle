import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Sidebar from "../../../components/sidebar";
import Chart from "../../../components/chart";
import Modal from "../../../components/modal";
import Notify from "../../../images/icons/notify.svg";
import Avatar from "../../../images/icons/avatar.svg";

export default function Settings() {
  const [name, setName] = useState();
  const [narration, setNarration] = useState();
  const [formComplete, setFormComplete] = useState(true);
  const [btn, setBtn] = useState("Request");
  const [err, setErr] = useState();
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);

  function handleModal() {
    setShowMessage(false);
    console.log("reached");
  }

  async function handleSend(e) {
    e.preventDefault();

    if (!name || !narration) {
      setFormComplete(false);
      return;
    }

    setFormComplete(true);
    setBtn("Please wait...");
    const load = {
      receiver: name,
      reason: narration,
    };

    console.log(load);
    const key = localStorage.getItem("token");
    const auth = `token${" "}${key}`;
    try {
      axios({
        method: "post",
        url: "https://bundle-backend.herokuapp.com/connect/requeststatement/",
        data: JSON.stringify(load),
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
          setShowMessage(true);
          setBtn("Request");
          setName("");
          setNarration("");
          setNarration()
        })
        .catch(() => {
          setSuccess(false);
          setShowMessage(true);
          setBtn("Request");
          setName("");
          setNarration("");
          setErr("An error occurred while trying to make request");
        });
    } catch (err) {
      setName("");
      setNarration("");
      setSuccess(false);
      setBtn("Request");
      setShowMessage(true);
      setErr("An error occurred");
    }
  }

  return (
    <>
      <div className="settings dash">
        <Sidebar activeTab="request" />

        <div className="statement__details dash__details settings__details">
          <nav className="dash-nav">
            <h2>Request Statement</h2>

            <div className="dash-nav__items">
              <Link href="/">
                <p>Logout</p>
              </Link>
              <div className="dash-nav__notify">
                <Image width={25} height={25} src={Notify} alt="notification" />
              </div>
              <Link href="./settings">
                <div className="dash-nav__user">
                  <Image
                    width={30}
                    height={30}
                    src={Avatar}
                    alt="user profile picture"
                  />
                </div>
              </Link>
            </div>
          </nav>
          <div className="personal__info">
            <div className="personal__info__items">
              <div className="personal__info__item">
                <h5>Receiver’s bundle username</h5>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={
                    formComplete
                      ? "send__input"
                      : "send__input auth__input--err"
                  }
                  name="send__input"
                />
              </div>

              <div className="personal__info__item">
                <h5>Narration/reason</h5>
                <textarea
                  onChange={(e) => setNarration(e.target.value)}
                  className={
                    formComplete
                      ? "send__input"
                      : "send__input auth__input--err"
                  }
                  rows={10}
                  cols={10}
                  name="send__input"
                ></textarea>
              </div>

              <div className="personal__info__item personal__info__item-btn personal__info__item-send">
                <button onClick={(e) => handleSend(e)}>{btn}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="small-screen__alert">
        <p>
          Sorry, this dashboard is not available on smaller screens. Switch to a
          desktop device and try again
        </p>
      </div>
      {showMessage ? (
        <Modal handleModal={handleModal} successful={success} />
      ) : null}
    </>
  );
}
