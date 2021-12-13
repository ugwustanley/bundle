import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../../components/sidebar";
import Chart from "../../../components/chart";
import Notify from "../../../images/icons/notify.svg";
import Avatar from "../../../images/icons/avatar.svg";
import Send from "../../../images/send-img.svg";
import moment from "moment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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

  const downloadPdfDocument = (rootElementId) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("Transactions.pdf");
    });
  };

  const router = useRouter();

  return (
    <>
      <div className="statement dash">
        <Sidebar activeTab="request" />

        <div className="statement__details dash__details">
          <nav className="dash-nav">
            <h2>Request</h2>

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

          <div className="send__options">
            <Link href="./request/statement">
              <div className="send__option">
                <div className="send__option-img">
                  <Image width={100} height={100} src={Send} alt="send" />
                  <h4>Request Statement</h4>
                </div>
              </div>
            </Link>
            <div className="send__option">
              <div className="send__option-img">
                <Image width={100} height={100} src={Send} alt="send" />
                <h4>Request Payment</h4>
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
