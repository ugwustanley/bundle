import Link from "next/link";
import {useState, useEffect} from 'react'
import Image from "next/image";
import Sidebar from "../../components/sidebar";
import Chart from "../../components/chart";
import Notify from "../../images/icons/notify.svg";
import Avatar from "../../images/icons/avatar.svg";

export default function Settings() {

  const [email , setEmail] = useState("ugwuchiagoziestanley@gmail.com");
  const [user , setUser] = useState("");
  const [name , name] = useState("ugwustanley");
  
  useEffect(() => {
   
    const user = localStorage.getItem('user');
    if(user){
      setUser(JSON.parse(user));
      setName(JSON.parse(user).userName);
      setEmail(JSON.parse(user).email)
    }
   
  },[])
  return (
    <>
      <div className="settings dash">
        <Sidebar activeTab="settings" />

        <div className="statement__details dash__details">
          <nav className="dash-nav">
            <h2>Settings</h2>

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
          <div className="personal__info">
            <h3>Personal Information</h3>

            <div className="personal__info__items">
              <div className="personal__info__item">
                <h5>Full Name</h5>
                <div>
                  <p>{username}</p>
                </div>
              </div>

              <div className="personal__info__item">
                <h5>Username</h5>
                <div>
                  <p>{username}</p>
                </div>
              </div>

              <div className="personal__info__item">
                <h5>Email Address</h5>
                <div>
                  <p>{email}</p>
                </div>
              </div>

              <div className="personal__info__item">
                <h5>Bank Verification Number (BVN)</h5>
                <div>
                  <p>000000000000</p>
                </div>
              </div>

              <div className="personal__info__item personal__info__item-btn">
                <button>Change Password</button>
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
