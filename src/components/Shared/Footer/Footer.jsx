import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-sm px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">MedCampConnect Inc.</h3>
          <p className="mt-2 text-sm">
            Connecting healthcare professionals and patients through medical
            camps.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-lg hover:animate-pulse">
            <FaFacebookF />
          </a>
          <a href="#" className="text-lg hover:animate-pulse">
            <FaTwitter />
          </a>
          <a href="#" className="text-lg hover:animate-pulse">
            <FaInstagram />
          </a>
          <a href="#" className="text-lg hover:animate-pulse">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      <div className="mt-4 border-t pt-4 text-center text-gray-400 text-sm">
        © 2024-2025 MedCampConnect Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
