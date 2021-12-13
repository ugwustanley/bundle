import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../../components/sidebar";
import Chart from "../../../components/chart";
import Notify from "../../../images/icons/notify.svg";
import Avatar from "../../../images/icons/avatar.svg";

export default function Settings() {
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
                <input type="text" className="send__input" name="send__input" />
              </div>

              <div className="personal__info__item">
                <h5>Receiver’s bundle email</h5>
                <input
                  type="email"
                  className="send__input"
                  name="send__input"
                />
              </div>

              <div className="personal__info__item">
                <h5>Start Date</h5>
                <input type="date" className="send__input" name="send__input" />
              </div>

              <div className="personal__info__item">
                <h5>End Date</h5>
                <input type="date" className="send__input" name="send__input" />
              </div>

              <div className="personal__info__item">
                <h5>Narration/reason</h5>
                <textarea
                  className="send__input"
                  rows={10}
                  cols={10}
                  name="send__input"
                ></textarea>
              </div>

              <div className="personal__info__item personal__info__item-btn personal__info__item-send">
                <button>Send</button>
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
    </>
  );
}
