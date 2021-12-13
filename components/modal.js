import React from "react";
import Image from 'next/image'
import Success from "../images/success.svg";
import Failure from "../images/failure.svg";

export default function Modal({ handleModal, successful }) {
  return (
    <div className="modal">
      {successful ? (
        <div className="modal__item">
          <Image
            className="modal__icon"
            src={Success}
            alt="success"
            width="100"
            height="100"
          />
          <h2>Success!</h2>
          <p>Request was made successfully.</p>
        </div>
      ) : (
        <div className="modal__item">
          <Image
            className="modal__icon"
            src={Failure}
            alt="confirmation"
            width="100"
            height="100"
          />
          <h2>Unsuccessful!</h2>
          <p>An Error occured while making request.</p>
        </div>
      )}
      <div onClick={handleModal} className="modal__area"></div>
    </div>
  );
}
