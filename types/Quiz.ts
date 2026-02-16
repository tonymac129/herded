export type QuestionType = {
  id: string;
  question: string;
  options: [string, string];
};

export type QuizType = {
  id: string;
  name: string;
  description: string;
  questions: QuestionType[];
  createdBy: string;
  createdAt: string;
  public: boolean;
};
