type SectionProps = {
  children: React.ReactNode;
  heading: string;
  description: string;
  flex?: boolean;
};

function Section({ children, heading, description, flex }: SectionProps) {
  return (
    <div
      className={`${flex ? "flex-3" : "flex-2"} border-2 border-gray-800 rounded-lg p-4 text-gray-800 flex items-center gap-x-4`}
    >
      {children}
      <div>
        <h2 className="font-bold text-black text-xl">{heading}</h2>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default Section;
