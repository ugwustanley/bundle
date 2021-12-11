import Link from "next/link";
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";

export default function Statement() {
  return (
    <div className="statement dash">
      <Sidebar />

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
        <Chart />
      </div>
    </div>
  );
}
