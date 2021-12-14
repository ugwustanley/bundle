import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";
import ViewModal from "../../components/viewModal";
import axios from "axios";
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

  const [statement, setStatement] = useState();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(transactions, accounts);
    setTrans(transactions);
    setAcc(accounts);
  }, []);

  async function getView() {
    console.log("called getView");
    const key = localStorage.getItem("token");
    const auth = `token${" "}${key}`;
    try {
      axios({
        method: "get",
        url: "https://bundle-backend.herokuapp.com/connect/sendstatement/",
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
        .then((res) => {
          console.log(res.data);
          setStatement(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getView();
  }, []);

  const downloadPdfDocument = (rootElementId) => {
    console.log("sodn");
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(
        statement[index].sender
          ? `${statement[index].sender}'s Transactions`
          : "transactions"
      );
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
              <p>Receiver</p>
              <p>Sender</p>
              <p>Narration</p>
              <p>Timeline</p>
              <p></p>
            </div>
            {statement
              ? statement.map((unit, index) => (
                  <div className="transaction-table__item">
                    <p>{unit.receiver}</p>
                    <p>{unit.sender}</p>
                    <p className="narration">{unit.reason}</p>
                    <p>{unit.timeline}</p>

                    <p
                      onClick={() => {
                        setShowMessage(true), setIndex(index);
                      }}
                      className="view"
                    >
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
        <ViewModal
          handleModal={handleViewModal}
          downloadPdfDocument={downloadPdfDocument}
          statement={
            statement[index].statement.message
              ? null
              : statement[index].statement.data
          }
          sender={statement[index].sender}
        />
      ) : null}
    </>
  );
}
