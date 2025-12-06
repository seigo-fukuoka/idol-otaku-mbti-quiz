export interface Question {
  id: number;
  text: string;
  dimension: 'IE' | 'SN' | 'TF' | 'JP';
  direction: 1 | -1;
}

export interface DiagnosisType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  traits: string[];
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface DiagnosisResult {
  type: DiagnosisType;
  scores: {
    IE: number;
    SN: number;
    TF: number;
    JP: number;
  };
}
