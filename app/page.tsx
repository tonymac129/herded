import type { QuizType } from "@/types/Quiz";
import { FaCloud, FaGlobe, FaShareSquare } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { dbConnect } from "@/lib/db";
import { Quiz } from "@/models/Quiz";
import Hero from "@/components/layout/Hero";
import Section from "@/components/ui/Section";
import Btn from "@/components/ui/Btn";
import QuizCard from "@/components/ui/QuizCard";

export default async function Home() {
  await dbConnect();
  const existingQuizzes = await Quiz.find({ public: true });
  const quizzes: QuizType[] = JSON.parse(JSON.stringify(existingQuizzes));

  return (
    <>
      <Hero
        title="Welcome to Herded!"
        description="Herded is a would you rather quiz platform where you can create custom interactive would you rather quizzes or take fun public quizzes other people created!"
        homepage
      />
      <div className="flex gap-x-5 mb-5 w-[80%] m-auto">
        <Section
          heading="Easily Create Custom Quizzes"
          description="Create fun, interactive, and completely customized would you rather quizzes with ease"
          flex
        >
          <MdQuiz size={60} className="w-15" />
        </Section>
        <Section
          heading="Share and Play Together"
          description="Share the quiz link to your friends and take the quiz together"
        >
          <FaShareSquare size={30} className="w-15" />
        </Section>
      </div>
      <div className="flex gap-x-5 w-[80%] m-auto">
        <Section
          heading="Automatic Cloud Sync"
          description="All your quizzes and data are automatically saved to the cloud"
        >
          <FaCloud size={80} className="w-15" />
        </Section>
        <Section
          heading="Browse and Explore Public Quizzes"
          description="Browse and explore all kinds of popular public would you rather quizzes other people created"
          flex
        >
          <FaGlobe size={40} className="w-15" />
        </Section>
      </div>
      <h2 className="text-2xl font-bold text-black text-center pt-10">
        Most popular quizzes
      </h2>
      <div className="flex flex-wrap justify-center py-10 gap-5">
        {quizzes
          .sort((a, b) => b.plays - a.plays)
          .slice(0, 4)
          .map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} showOwner />;
          })}
      </div>
      <h2 className="text-2xl font-bold text-black text-center">
        Most recent quizzes
      </h2>
      <div className="flex flex-wrap justify-center pt-10 pb-5 gap-5">
        {quizzes
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 4)
          .map((quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} showOwner />;
          })}
      </div>
      <div className="flex justify-center">
        <Btn text="Browse all" link="/quizzes" primary />
      </div>
    </>
  );
}
