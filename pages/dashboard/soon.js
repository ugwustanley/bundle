import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Soon2 from "../../images/soon.svg";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";
import Send from "../../images/send-img.svg";

export default function Soon() {
  const router = useRouter();

  return (
    <>
      <div className="statement dash">
        <Sidebar activeTab="" />

        <div className="statement__details dash__details">
          <nav className="dash-nav">
            <h2>Coming Soon</h2>

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

          <div className="soon__container">
            <Image src={Soon2} width={300} height={300} alt="coming soon" />
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
