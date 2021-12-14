import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../../components/sidebar";
import Notify from "../../../images/icons/notify.svg";
import Modal from "../../../components/modal";
import Avatar from "../../../images/icons/avatar.svg";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Send() {
  const [name, setName] = useState();
  const [narration, setNarration] = useState();
  const [timeline2, setTimeline2] = useState("last6months");
  const [account, setAccount] = useState();
  const [formComplete, setFormComplete] = useState(true);
  const [btn, setBtn] = useState("Send");
  const [statement, setStatement] = useState();
  const [err, setErr] = useState();
  const [mono, setMono] = useState();
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [acc, setAcc] = useState();
  const [id, setId] = useState(acc ? acc[0].mono_id : null);

  function handleModal() {
    setShowMessage(false);
    console.log("reached");
  }

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAcc(accounts);
    setId(accounts[0].mono_id);
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    console.log(name, narration, timeline2, id, mono);
    if (!name || !narration || !timeline2 || !mono) {
      setFormComplete(false);
      return;
    }

    setFormComplete(true);
    setBtn("Please wait...");
    const load = {
      receiver: name,
      reason: narration,
      timeline: timeline2,
      mono_id: mono,
    };

    console.log(load);

    const key = localStorage.getItem("token");
    const auth = `token${" "}${key}`;
    try {
      axios({
        method: "post",
        url: "https://bundle-backend.herokuapp.com/connect/sendstatement/",
        data: JSON.stringify(load),
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
        .then((res) => {
          console.log(res.data);
          setStatement(res.data);
          setBtn("Send");
          setSuccess(true);
          setShowMessage(true);
          setName("");
          setNarration("");
        })
        .catch((err) => {
          setBtn("Send");
          setErr("An error occured while trying to send statement");
          setShowMessage(true);
          setName("");
          setNarration("");
        });
    } catch (err) {
      setBtn("Send");
      setErr("An error occured");
      setShowMessage(true);
      setName("");
      setNarration("");
      setTimeline2("");
      setAccount("");
    }
  }

  return (
    <>
      <div className="settings dash">
        <Sidebar activeTab="send" />

        <div className="statement__details dash__details settings__details">
          <nav className="dash-nav">
            <h2>Send Statement</h2>

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
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={
                    formComplete
                      ? "send__input"
                      : "send__input  auth__input--err"
                  }
                  name="send__input"
                />
              </div>

              <div className="personal__info__item">
                <h5>Timeline</h5>
                <select
                  className={
                    formComplete
                      ? "send__input statement__account-options"
                      : "send__input statement__account-options auth__input--err"
                  }
                  id="account-options"
                  onChange={(e) => setTimeline2(e.target.value)}
                >
                  <option value="" default disabled>
                    Select Timeline
                  </option>
                  <option value="last6months">Last 6 months</option>
                  <option value="last12months">Last 12 months</option>
                </select>
              </div>

              <div className="personal__info__item">
                <h5>Select Account</h5>

                <select
                  id="account-options"
                  className={
                    formComplete
                      ? "send__input statement__account-options"
                      : "send__input statement__account-options auth__input--err"
                  }
                  onChange={(e) => setMono(e.target.value)}
                >
                  <option value="">
                    Select Account
                  </option>
                  {acc
                    ? acc.map((unit, index) => (
                        <option value={acc[index].mono_id}>
                          {acc[index].account_name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              {/* <div className="personal__info__item">
                <h5>End Date</h5>
                <input 
                  type="date" 
                  className="send__input" 
                  name="send__input" 
                  // you can delete this
                />
              </div> */}

              <div className="personal__info__item">
                <h5>Narration/reason</h5>
                <textarea
                  onChange={(e) => setNarration(e.target.value)}
                  value={narration}
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
      {showMessage && !statement.statement.message ? (
        <Modal handleModal={handleModal} successful={success} />
      ) : null}
    </>
  );
}
