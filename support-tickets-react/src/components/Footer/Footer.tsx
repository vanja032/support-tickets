import logo_gray from "../../assets/media/logo-gray.png";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import "../../assets/style/Footer/Footer.css";

const Footer = () => {
  return (
    <>
      {" "}
      <div className="flex-grow-1"></div>
      <footer className="footer">
        <div className="row py-4 px-5 m-0">
          <div className="col-md-3 text-center py-2 d-flex align-items-center justify-content-center">
            <img src={logo_gray} className="page-logo" alt="Shop footer Logo" />
          </div>
          <div className="col text-center py-2 d-flex align-items-center justify-content-center">
            <p className="copyright m-0">
              <span className="cp-symbol">
                &copy; 2023 Support Tickets company.
              </span>{" "}
              All rights reserved.
            </p>
          </div>
          <div className="col-md-3 text-center py-2 d-flex align-items-center justify-content-center">
            <div className="social-icons">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="px-2"
              >
                <BiLogoFacebook />
              </a>
              <a href="https://twitter.com/" target="_blank" className="px-2">
                <BsTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="px-2"
              >
                <FaInstagram />
              </a>
              <a href="https://discord.com/" target="_blank" className="px-2">
                <BsDiscord />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
