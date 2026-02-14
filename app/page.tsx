import { FaCloud, FaGlobe, FaShareSquare } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import Hero from "@/components/layout/Hero";
import Section from "@/components/ui/Section";

export default function Home() {
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
          description="Create fun, interactive, and compeltely customized would you rather quizzes with ease"
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
    </>
  );
}
