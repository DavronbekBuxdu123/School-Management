"use client";
import React, { useState } from "react";
import Menu from "./Menu";
import Image from "next/image";
import { FiSidebar } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button className="lg:hidden p-2" onClick={() => setOpen(true)}>
        <FiSidebar size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[50%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <IoExitOutline size={24} />
          </button>
        </div>
        <Menu />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
