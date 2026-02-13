type SectionProps = {
  heading: string;
  description: string;
};

function Section({ heading, description }: SectionProps) {
  return (
    <div>
      <h2 className="font-bold text-black text-2xl">{heading}</h2>
      <div>{description}</div>
    </div>
  );
}

export default Section;
