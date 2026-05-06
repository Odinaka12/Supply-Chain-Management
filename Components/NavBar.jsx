import React, { useContext, useEffect, useState } from "react";
import { TrackingContext } from "../Conetxt/SupplyChain";
import { Nav1, Nav2, Nav3 } from "../Components/index";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navigation = [
    { title: "Home", path: "#" },
    { title: "Services", path: "#" },
    { title: "Contact Us", path: "#" },
    { title: "Erc20", path: "#" },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".menu-btn")) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">

        {/* 🔥 MAIN NAV ROW */}
        <div className="flex items-center justify-between py-4">

          {/* LEFT SIDE: Logo + Menu */}
          <div className="flex items-center gap-10">
            <h1 className="text-xl font-bold">LOGO</h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6 text-gray-700">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a href={item.path} className="hover:text-black">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* Wallet */}
            {currentUser ? (
              <p className="px-4 py-2 text-white bg-gray-800 rounded-full text-sm">
                {currentUser.slice(0, 10)}...
              </p>
            ) : (
              <button
                onClick={connectWallet}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full"
              >
                Connect
                <Nav3 />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="menu-btn md:hidden text-gray-600"
              onClick={() => setOpen(!open)}
            >
              {open ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-4 text-gray-700">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              {!currentUser && (
                <button
                  onClick={connectWallet}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full"
                >
                  Connect Wallet
                  <Nav3 />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}