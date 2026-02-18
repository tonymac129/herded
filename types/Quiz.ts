export type CommentType = {
  id: string;
  user: string;
  trait: "white sheep" | "gray sheep" | "black sheep";
  text: string;
  createdAt: string;
};

export type OptionType = {
  text: string;
  votes: number;
};

export type QuestionType = {
  id: string;
  question: string;
  options: [OptionType, OptionType];
};

export type QuizType = {
  id: string;
  name: string;
  description?: string;
  questions: QuestionType[];
  createdBy: string;
  createdAt: string;
  public: boolean;
  comments: CommentType[];
  plays: number;
};
