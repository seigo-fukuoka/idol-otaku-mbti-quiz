export interface Question {
  id: number;
  text: string;
  dimension: 'axis1' | 'axis2' | 'axis3' | 'axis4';
  direction: 1 | -1;
}

export interface DiagnosisType {
  id: string;
  name: string;
  catchphrase: string;
  description: string;
  imageUrl: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface DiagnosisResult {
  type: DiagnosisType;
  scores: {
    axis1: number;
    axis2: number;
    axis3: number;
    axis4: number;
  };
}
