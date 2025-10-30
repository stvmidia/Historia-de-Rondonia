
export interface Option {
  letter: string;
  text: string;
}

export type QuestionType = 'multiple-choice' | 'discursive';

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
  type: QuestionType;
}
