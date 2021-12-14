import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";

export default function Estimate() {
  const router = useRouter();
  const [months, setMonths] = useState(1);
  const [trans, setTrans] = useState();
  const [averageAm, setAverageAm] = useState();
  const [averageW, setAverageW] = useState();
  const [acc, setAcc] = useState();
  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    // console.log(transactions, accounts);

    setAverageAm(
      transactions.reduce((total, amount, index, array) => {
        total += amount.balance;
        if (index === array.length - 1) {
          return total / array.length;
        } else {
          return total;
        }
      }, 0)
    );

    setAverageW(
      transactions.reduce((total, amount, index, array) => {
        total += amount.amount;
        if (index === array.length - 1) {
          return total / array.length;
        } else {
          return total;
        }
      }, 0)
    );

    setTrans(transactions);
    setAcc(accounts);
  }, []);
  return (
    <>
      <div className="statement dash">
        <Sidebar activeTab="estimate" />

        <div className="statement__details dash__details">
          <nav className="dash-nav">
            <h2>Estimate</h2>

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
                      <option value={acc[index].mono_id}>
                        {acc[index].account_name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="accounts__box">
              {" "}
              <label for="account-options">Select Months</label>
              <select
                className="statement__account-options"
                id="account-options"
                onChange={(e) => setMonths(e.target.value)}
              >
                <option value="" default disabled>
                  Select Months
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <Chart />
          <div className="final__estimate">
            <p>
              Estimated balance after<b> {months || 1} </b>Month(s):{" "}
              <b>{trans ? trans[months].balance : "000"}</b>
            </p>
            <p>
              Estimated amount of deposits for <b> {months || 1} </b> Month(s)
              selected period: <b>{averageAm ? averageAm * months : "000"}</b>
            </p>
            <p>
              Estimated amount of withdrawals for <b> {months || 1} </b>{" "}
              Month(s) selected period:{" "}
              <b>{averageW ? averageW * months : "000"}</b>
            </p>
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
