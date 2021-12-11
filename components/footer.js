import Link from 'next/link'
import Logo from '../images/logo.svg'
import Image from 'next/image'
import Instagram from '../images/icons/instagram.svg'
import Twitter from '../images/icons/twitter.svg'
import Facebook from '../images/icons/facebook.svg'

export default function Footer(){
    return(
        <footer className="footer">
           <div className="footer__logo">
              <Image src={Logo} alt="logo" />
           </div>
           <div className="footer__products">
               <h3>Products</h3>
               <Link href="#"><p>Test1</p></Link>
               <Link href="#"><p>Test2</p></Link>
               <Link href="#"><p>Test3</p></Link>
           </div>
           <div className="footer__company">
               <h3>Company</h3>
               <Link href="#"><p>About</p></Link>
               <Link href="#"><p>FAQs</p></Link>
               <Link href="#"><p>Meet our team</p></Link>
           </div>
           <div className="footer__legal">
               <h3>Legal</h3>
               <Link href="#"><p>Terms</p></Link>
               <Link href="#"><p>Privacy</p></Link>
               <Link href="#"><p>Security</p></Link>
           </div>
           <div className="footer__contact">
               <div className="footer__socials">
                   <div className="footer__social footer__social--twitter">
                       <Image width="17" height="17" src={Twitter} alt="twitter link" />
                   </div>
                   <div className="footer__social footer__social--instagram">
                       <Image width="17" height="17" src={Instagram} alt="instagram link" />
                   </div>
                   <div className="footer__social footer__social--facebook">
                       <Image width="17" height="17" src={Facebook} alt="facebook link" />
                   </div>
               </div>

               <div>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
               </div>

               <div>
                   <p>hello@test.com</p>
               </div>

               <div>
                   <p>+123 456 789 9900</p>
               </div>
           </div>
        </footer>
    )
}