import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Btn from "../ui/Btn";
import Link from "next/link";
import Image from "next/image";

const navLinkStyles =
  "border-2 border-transparent hover:border-gray-800 px-3 py-1 rounded-lg transition-colors text-lg";

async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-2 z-10">
      <nav
        className="border-2 border-gray-800 rounded-lg bg-gray-200 max-w-280 w-[95%] lg:w-[80%] m-auto py-2 relative flex justify-center
      items-center"
      >
        <Link
          href="/"
          className="text-2xl font-bold absolute left-1 sm:left-3 md:left-10 flex gap-x-3 items-center"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={55}
            height={55}
            className="w-9 sm:w-13"
          />
          <span className="hidden md:block">Herded</span>
        </Link>
        <div className="flex gap-x-0 md:gap-x-3">
          <Link href="/" className={navLinkStyles + " hidden sm:block"}>
            Home
          </Link>
          <Link href="/quizzes" className={navLinkStyles}>
            Quizzes
          </Link>
          <Link href="/about" className={navLinkStyles}>
            About
          </Link>
        </div>
        {session?.user ? (
          <div className="flex gap-x-0 sm:gap-x-3 absolute right-1 sm:right-3 md:right-10">
            <Link
              href="/profile"
              className={navLinkStyles + " flex items-center gap-x-2"}
            >
              <Image
                src={session.user.image!}
                alt="Avatar"
                width={35}
                height={35}
                className="rounded-full border-2 border-gray-800"
              />{" "}
              <span className="hidden md:block">{session.user.name}</span>
            </Link>
            <Btn text="Create" link="/create" primary />
          </div>
        ) : (
          <div className="flex gap-x-3 absolute right-1 sm:right-3 md:right-10">
            <Btn text="Sign in" link="/signin" primary />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
