import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 p-4 bg-white shadow-md">
        <Link className="flex items-center justify-start gap-2 mb-6" href="/">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="text-xl font-bold">DavaSchool</span>
        </Link>
        <Menu />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
