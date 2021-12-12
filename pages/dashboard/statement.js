import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";

export default function Statement() {
  return (
    <>
    <div className="statement dash">
      <Sidebar activeTab="statement" />

      <div className="statement__details dash__details">
        <nav className="dash-nav">
          <h2>Account Statement</h2>

          <div className="dash-nav__items">
            <Link href="">
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
        <div className="statement__config">
          <div className="accounts__box">
            {" "}
            <label for="account-options">Select Account</label>
            <select className="statement__account-options" id="account-options">
              <option value="" default disabled>
                Select Account
              </option>
              <option value="00000000">00000000</option>
              <option value="00000000">00000000</option>
              <option value="00000000">00000000</option>
            </select>
          </div>
          <div className="start-date__box">
            <label for="start-date">Select Start Date</label>
            <input type="date" name="start-date" className="start-date date" />
          </div>
          <div className="end-date__box">
            <label for="end-date">Select End Date</label>
            <input type="date" name="start-date" className="end-date date" />
          </div>
        </div>
        <Chart />
        <div className="transaction-table">
          {/* heading for table */}
          <div className="transaction-table__item transaction-table__header">
            <p>Transaction Date</p>
            <p>Narration</p>
            <p>Withdrawals</p>
            <p>Deposit</p>
            <p>Balance</p>
          </div>

        </div>
      </div>
    </div>
      <div className="small-screen__alert">
      <p>Sorry, this dashboard is not available on smaller screens. Switch to a desktop device and try again</p>
    </div>
  </>
  );
}
