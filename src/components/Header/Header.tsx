import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/Logo.svg";
import SearchBar from "@/components/SearchBar/SearchBar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container ">
        <div className="header-container">
          <Link href="/" className="logo">
            <Image src={Logo} alt="logo" />
            <span className="logoText">Memes</span>
          </Link>

          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
