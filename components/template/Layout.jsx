"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../molecules/Navbar";
import Footer from "../molecules/Footer";
import { Toaster } from "react-hot-toast";
import WhatsApp from "../WhatsApp";
import { usePathname } from "@/navigation";
import { Context } from "@/app/context";

const MENU_OFFSET =
  "ltr:left-[320px] rtl:right-[320px] max-[360px]:ltr:left-[280px] max-[360px]:rtl:right-[280px]";

export default function Layout({ children, initialSettings }) {
  const [isclick, setisclick] = useState(false);
  const handleClick = () => {
    setisclick(!isclick);
  };

  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  useEffect(() => {
    setisclick(false);
  }, [pathname]);

  const hideFooter =
    pathname === "/test" || pathname === "/about-us" || pathname === "/";

  const shift = isclick ? MENU_OFFSET : "ltr:left-0 rtl:right-0";

  return (
    <Context initialSettings={initialSettings}>
      <main className="overflow-x-hidden">
        <Navbar isclick={isclick} handleClick={handleClick} />
        <WhatsApp />

        <div className={`relative duration-300 ${shift}`}>{children}</div>
        {!hideFooter && (
          <Footer id="footer" cn={`relative duration-300 ${shift}`} />
        )}

        {isclick ? (
          <div
            onClick={handleClick}
            className="fixed inset-0 z-[99980] bg-black/70"
          />
        ) : null}

        <Toaster position="bottom-center" duration={9000} />
      </main>
    </Context>
  );
}
