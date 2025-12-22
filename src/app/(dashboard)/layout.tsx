import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex ">
      {/* LEFT */}
      <div className="hidden md:block  md:w-[8%] lg:w-[16%]  p-4">
        <Link
          className="flex items-center justify-center lg:justify-start  gap-2"
          href="/"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">DavaSchool</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[100%]  md:w-[92%] lg:w-[84%]  bg-gray-100 flex flex-col ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
