import React, { useEffect, useState } from "react";
import Image from "next/image";
import Success from "../images/success.svg";
import Failure from "../images/failure.svg";
import moment from "moment";

export default function ViewModal({
  handleModal,
  downloadPdfDocument,
  statement,
  sender,
}) {
  const [trans, setTrans] = useState();

  const [acc, setAcc] = useState();

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(transactions, accounts);
    setTrans(transactions);
    setAcc(accounts);
  }, []);
  return (
    <>
      <div className="modal">
        <div className="modal__item view-modal__item">
          <div
            className="transaction-table sent-request-view"
            id="trans__table"
          >
            <h3>{sender ? sender : "Ugwu Stanley"}</h3>
            {/* heading for table */}
            <div className="transaction-table__item transaction-table__header  sent-request-view__header">
              <p>Date</p>
              <p>Narration</p>
              <p>Withdrawals</p>
              <p>Deposit</p>
              <p>Balance</p>
            </div>
            {statement
              ? statement.map((unit, index) => (
                  <div className="transaction-table__item">
                    {console.log(typeof statement)}

                    <p>
                      {moment(statement[index].date).format("MM/DD/YYYY") ||
                        "null"}
                    </p>
                    <p className="narration">{statement[index].narration}</p>
                    <p>{statement[index].amount}</p>
                    <p>{statement[index].type}</p>
                    <p>{statement[index].balance}</p>
                  </div>
                ))
              : null}
            {statement ? console.log(statement) : null}
          </div>

          <div className="send-request-view__buttons">
            <button
              onClick={handleModal}
              className="send-request-view__button send-request-view__button--close"
            >
              Close
            </button>
            <button
              onClick={() => downloadPdfDocument("trans__table")}
              className="send-request-view__button send-request-view__button--print"
            >
              Download
            </button>
          </div>
        </div>

        <div onClick={handleModal} className="modal__area"></div>
      </div>
    </>
  );
}
