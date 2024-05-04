import logo from "../../assets/logo/logo.png";
import twitter from "../../assets/icons/twitter.png";
import fb from "../../assets/icons/fb.png";
import insta from "../../assets/icons/insta.png";
import youtube from "../../assets/icons/youtube.png";

const Footer = () => {
  return (
    <div className="bg-[#fff] fixed z-999 bottom-0 h-16 w-full py-4 px-16 flex justify-between shadow-inner mobile:px-4 mobile:h-10">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-[120px] mobile:w-[78px]" />
      </div>
      <div className="flex items-center gap-4">
        <span className="mobile:text-[12px]">
          &#169; 2024 All Rights Reserved.
        </span>
        <span className="flex items-center gap-2 mobile:hidden">
          <img
            src={twitter}
            alt="twitter icon"
            className="w-[18px] cursor-pointer mobile:w-[12px]"
          />
          <img
            src={fb}
            alt="facebook icon"
            className="w-[18px] cursor-pointer mobile:w-[12px]"
          />
          <img
            src={insta}
            alt="instagram icon"
            className="w-[18px] cursor-pointer mobile:w-[12px]"
          />
          <img
            src={youtube}
            alt="youtube icon"
            className="w-[18px] cursor-pointer mobile:w-[12px]"
          />
        </span>
      </div>
    </div>
  );
};
export default Footer;
