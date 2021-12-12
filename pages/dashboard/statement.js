import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";
import moment from "moment";

export default function Statement() {
  const [trans, setTrans] = useState();
  const [acc, setAcc] = useState();
  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(transactions, accounts);
    setTrans(transactions);
    setAcc(accounts);
  }, []);

  const router = useRouter();
  // useEffect(() => {
  //   if (!JSON.parse(localStorage.getItem("token"))) {
  //     router.replace("/");
  //     return;
  //   }
  // }, []);
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
              <select
                className="statement__account-options"
                id="account-options"
              >
                <option value="" default disabled>
                  Select Account
                </option>
                {acc
                  ? acc.map((unit, index) => (
                      <option value={acc[index].account_name}>
                        {acc[index].account_name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="start-date__box">
              <label for="start-date">Select Start Date</label>
              <input
                type="date"
                name="start-date"
                className="start-date date"
              />
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
              <p>Date</p>
              <p>Narration</p>
              <p>Amount</p>
              <p>Type</p>
              <p>Balance</p>
            </div>
            {trans
              ? trans.map((unit, index) => (
                  <div className="transaction-table__item">
                    <p>{moment(trans[index].date).format("MM/DD/YYYY")}</p>
                    <p className="narration">{trans[index].narration}</p>
                    <p>{trans[index].amount}</p>
                    <p>{trans[index].type}</p>
                    <p>{trans[index].balance}</p>
                  </div>
                  // console.log(index, trans[index].date, "uiu");
                ))
              : null}
            {/* {trans ? console.log(trans[2], "0099") : null} */}
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
