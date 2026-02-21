import Link from "next/link";

const linkStyles = "text-green-700 font-bold hover:underline";

function Footer() {
  return (
    <div className="flex flex-col items-center gap-y-5 py-10 border-gray-800 mt-15 border-2 rounded-lg bg-gray-200 max-w-280 w-[80%] m-auto justify-center mb-5">
      <Link href="/">
        <h2 className="font-bold text-black text-2xl">Herded</h2>
      </Link>
      <div>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/tonymac129"
          target="_blank"
          className={linkStyles}
        >
          TonyMac129
        </a>
      </div>
      <div className="flex gap-x-10">
        <a
          href="https://github.com/tonymac129/herded"
          target="_blank"
          className={linkStyles}
        >
          Source code
        </a>
        <a
          href="https://github.com/tonymac129/herded/issues"
          target="_blank"
          className={linkStyles}
        >
          Feedback
        </a>
      </div>
    </div>
  );
}

export default Footer;
