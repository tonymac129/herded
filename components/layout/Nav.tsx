import Btn from "../ui/Btn";
import Link from "next/link";

const navLinkStyles =
  "border-2 border-transparent hover:border-gray-800 px-3 py-1 rounded-lg transition-colors text-lg active:bg-green-500!";

function Nav() {
  return (
    <nav className="border-2 border-gray-800 rounded-lg sticky top-2 bg-gray-200 z-10 max-w-280 w-[80%] m-auto py-2 px-10 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Herded
      </Link>
      <div className="flex gap-x-5">
        <Link href="/" className={navLinkStyles}>
          Home
        </Link>
        <Link href="/dashboard" className={navLinkStyles}>
          Dashboard
        </Link>
        <Link href="/quizzes" className={navLinkStyles}>
          Quizzes
        </Link>
        <Link href="/about" className={navLinkStyles}>
          About
        </Link>
      </div>
      <Btn text="Sign in" link="/signin" primary />
    </nav>
  );
}

export default Nav;
