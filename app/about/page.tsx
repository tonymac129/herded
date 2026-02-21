import Hero from "@/components/layout/Hero";

const linkStyles = "text-green-700 font-bold hover:underline";

function Page() {
  return (
    <>
      <Hero
        title="About"
        description="Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!"
      />
      <h2 className="text-2xl font-bold text-black text-center">
        What is Herded?
      </h2>
      <p className="py-5 w-[80%] text-lg m-auto text-gray-800">
        Herded is a would you rather quiz platform where you can create custom
        interactive would you rather quizzes or take fun public quizzes other
        people created! With features like create quizzes, votes, results page,
        comments, profile & quiz management, and browse quiz, you can easily
        create interactive quizzes and share it with your friends and other
        people for everyone to take! By signing in with an account, you can also
        manage your own quizzes and securely back up quiz data to the cloud.
        This is a fully open source fullstack web app built with Next.js, hosted
        on{" "}
        <a
          href="https://github.com/tonymac129/herded"
          target="_blank"
          className={linkStyles}
        >
          GitHub
        </a>{" "}
        for the Hack Club winter event{" "}
        <a
          href="https://flavortown.hackclub.com"
          target="_blank"
          className={linkStyles}
        >
          Flavortown
        </a>
        !
      </p>
      <h2 className="text-2xl font-bold text-black text-center">Why Herded?</h2>
      <p className="py-5 w-[80%] text-lg m-auto text-gray-800">
        Initially, I wasn&apos;t planning on making a quiz app/platform at all,
        but one day my friend suddenly walked up to me at school and jokingly
        asked if I took commisions to make apps. I was a bit confused at first,
        but after hearing him talk about a would you rather quiz app, I got
        super interested in this idea as I could practice my fullstack skills
        while having fun with an actually interesting project. As this
        isn&apos;t a super serious app, I decided to try out this neo brutalism
        design style, and it actually looks pretty decent and fits the vibes of
        the website pretty well.
      </p>
    </>
  );
}

export default Page;
