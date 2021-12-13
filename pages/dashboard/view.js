import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";
import ViewModal from "../../components/viewModal";
import moment from "moment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Statement() {
  function handleViewModal() {
    setShowMessage(false);
    console.log("reached");
  }

  const [trans, setTrans] = useState();

  const [acc, setAcc] = useState();

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(transactions, accounts);
    setTrans(transactions);
    setAcc(accounts);
  }, []);

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.autoPrint();
    });
  };

  const router = useRouter();

  return (
    <>
      <div className="view dash">
        <Sidebar activeTab="view" />

        <div className="statement__details dash__details">
          <nav className="dash-nav">
            <h2>Account Statement</h2>

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

          <div
            className="transaction-table sent-request-table"
            id="trans__table"
          >
            {/* heading for table */}
            <div className="transaction-table__item transaction-table__header  sent-request-table__header">
              <p>Date Sent</p>
              <p>Date Received</p>
              <p>Name of reciever</p>
              <p>Status</p>
              <p></p>
            </div>
            {trans
              ? trans.map((unit, index) => (
                  <div className="transaction-table__item">
                    <p>{moment(trans[index].date).format("MM/DD/YYYY")}</p>
                    <p className="narration">{trans[index].balance}</p>
                    <p>{trans[index].amount}</p>
                    <p>{trans[index].type}</p>
                    <p onClick={() => setShowMessage(true)} className="view">
                      view
                    </p>
                  </div>
                ))
              : null}
          </div>

          {/* <div className="statement__download">
            <button onClick={() => setShowMessage(true)}>Download PDF</button>
          </div> */}
        </div>
      </div>
      <div className="small-screen__alert">
        <p>
          Sorry, this dashboard is not available on smaller screens. Switch to a
          desktop device and try again
        </p>
      </div>
      {showMessage ? (
        <ViewModal handleModal={handleViewModal}  />
      ) : null}
    </>
  );
}
