import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

    <div className="h-[180px] w-full flex items-center justify-around bg-slate-300 bg-opacity-50 text-black bottom-0">

      <div className="h-[80%] w-[25%] text-center">
        <p className="text-lg mb-5">About Us</p>
        <ul className="list-none ">
          <li className="mb-1 text-sm"><Link to="/contact" className="hover:underline">Contact Us</Link></li>
        </ul>
      </div>
      <div className="h-[80%] w-[25%] text-center">
        <p className="text-lg mb-5">Legal</p>
        <ul className="list-none">
          <li className="mb-1 text-sm"><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          <li className="mb-1 text-sm"><Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
          <li className="mb-1 text-sm"><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
          <li className="mb-1 text-sm"><Link to="/investor-relations" className="hover:underline">Investor Relations</Link></li>
        </ul>
      </div>
      <div className="h-[80%] w-[25%] text-center">
        <p className="text-lg mb-5">Learn More</p>
        <ul className="list-none  ">
          <li className="mb-1 text-sm"><Link to="/privacy" className="hover:underline">Privacy</Link></li>
          <li className="mb-1 text-sm"><Link to="/security" className="hover:underline">Security</Link></li>
          <li className="mb-1 text-sm"><Link to="/terms" className="hover:underline">Terms</Link></li>
          <li className="mb-1 text-sm"><Link to="/sitemap" className="hover:underline">Sitemap</Link></li>
        </ul>
      </div>
      <div className="h-[80%] w-[25%] text-center">
        <p className="text-lg mb-5">We Deliver To:</p>
        <ul className="list-none ">
          <li className="mb-1 text-sm"><Link to="/ccsit" className="hover:underline">CCSIT</Link></li>
          <li className="mb-1 text-sm"><Link to="/paramedical" className="hover:underline">PARAMEDICAL</Link></li>
          <li className="mb-1 text-sm"><Link to="/nursing" className="hover:underline">NURSING</Link></li>
          <li className="mb-1 text-sm"><Link to="/pharmacy" className="hover:underline">PHARMACY</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
