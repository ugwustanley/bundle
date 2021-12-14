import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo-3.svg";
import Statement from "../images/icons/statement.svg";
import Request from "../images/icons/request.svg";
import Estimate from "../images/icons/estimate.svg";
import Send from "../images/icons/send.svg";
import View from "../images/icons/view.svg";
import Settings from "../images/icons/settings.svg";
export default function ({ activeTab }) {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Image src={Logo} width={150} height={100} alt="sidebar logo" />
      </div>

      <div className="sidebar__links-container">
        <ul className="sidebar__links">
          <Link href="/dashboard/statement">
            <li
              className={
                activeTab === "statement"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image
                src={Statement}
                width={20}
                height={20}
                alt="account statement"
              />
              <p> Account Statement</p>
            </li>
          </Link>
          <Link href="/dashboard/request">
            <li
              className={
                activeTab === "request"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image
                src={Request}
                width={20}
                height={20}
                alt="request statement"
              />
              <p>Request</p>
            </li>
          </Link>
          <Link href="/dashboard/estimate">
            <li
              className={
                activeTab === "estimate"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image
                src={Estimate}
                width={20}
                height={20}
                alt="account estimate"
              />
              <p>Estimate</p>
            </li>
          </Link>
          <Link href="/dashboard/view">
            <li
              className={
                activeTab === "view"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image src={View} width={20} height={20} alt="view statement" />
              <p>View</p>
            </li>
          </Link>
          <Link href="/dashboard/send">
            <li
              className={
                activeTab === "send"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image src={Send} width={20} height={20} alt="send statement" />
              <p>Send</p>
            </li>
          </Link>

          <Link href="/dashboard/settings">
            <li
              className={
                activeTab === "settings"
                  ? `sidebar__link sidebar__link--active`
                  : `sidebar__link`
              }
            >
              <Image
                src={Settings}
                width={20}
                height={20}
                alt="account settings"
              />
              <p>Settings</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
