import Btn from "../ui/Btn";

type HeroProps = {
  title: string;
  description?: string;
  homepage?: boolean;
};

function Hero({ title, description, homepage }: HeroProps) {
  return (
    <div className="flex flex-col gap-y-10 py-15 items-center w-[70%] m-auto text-center">
      <h1 className="text-black text-5xl font-bold">{title}</h1>
      <p className="text-gray-800 text-lg">{description}</p>
      {homepage && (
        <div className="flex gap-x-5">
          <Btn text="Try now" link="/signin" primary />
          <Btn text="Learn more" link="/about" />
        </div>
      )}
    </div>
  );
}

export default Hero;
