import logo from "../../assets/logo/logo.png";
import twitter from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/fb.png";
import insta from "../../assets/icons/insta.png";
import youtube from "../../assets/icons/youtube.png";

const Footer = () => {
  return (
    <div className="bg-[#fff] fixed z-999 bottom-0 h-16 w-full py-4 px-16 flex justify-between shadow-inner">
      <div className="flex items-center">
        <img src={logo} alt="logo" width={"120px"} />
      </div>
      <div className="flex items-center gap-16">
        <span> &#169; 2024 All Rights Reserved.</span>
        <span className="flex items-center gap-2">
          <img src={twitter} alt="twitter icon" width="18px" />
          <img src={fb} alt="facebook icon" width="18px" />
          <img src={insta} alt="instagram icon" width="18px" />
          <img src={youtube} alt="youtube icon" width="18px" />
        </span>
      </div>
    </div>
  );
};
export default Footer;
