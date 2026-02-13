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
      <Section
        heading="Easily Create Custom Quizzes"
        description="cool app 123 fullstack would you rather quiz app"
      />
      <Section
        heading="Share and Play Together Instantly"
        description="cool app 123 fullstack would you rather quiz app"
      />
      <Section
        heading="Browse and Explore Public Quizzes"
        description="cool app 123 fullstack would you rather quiz app"
      />
    </>
  );
}
