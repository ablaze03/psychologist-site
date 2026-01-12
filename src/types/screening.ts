// Типы для психологического скрининг-теста

export type ScaleType = 
  | 'PHQ2' | 'PHQ9'
  | 'GAD2' | 'GAD7'
  | 'PSS_SHORT' | 'PSS10'
  | 'WHO_SHORT' | 'WHO5'
  | 'TOPIC_REL' | 'TOPIC_WORK' | 'TOPIC_ANX' | 'TOPIC_OTHER'
  | 'SAFETY';

export type TopicType = 'relationships' | 'anxiety' | 'work' | 'other' | 'all';
export type VersionType = 'quick' | 'deep' | 'both';
export type AnswerValue = 0 | 1 | 2 | 3;
export type SeverityLevel = 'low' | 'moderate' | 'high';

export interface AnswerOption {
  value: AnswerValue;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  scale: ScaleType;
  evidence_source: string;
  reverse_scored: boolean;
  answers: AnswerOption[];
  version: VersionType;
  topic_gate: TopicType;
  order: number;
}

export interface QuestionResponse {
  question_id: string;
  answer: AnswerValue;
  timestamp: number;
}

export interface ScaleScore {
  scale: ScaleType;
  raw_score: number;
  max_score: number;
  percent: number;
  level: SeverityLevel;
}

export interface SessionData {
  session_id: string;
  topic_selected: TopicType;
  version_selected: VersionType;
  responses: Record<string, AnswerValue>;
  started_at: number;
  finished_at?: number;
  result?: TestResult;
}

export interface TestResult {
  scores: ScaleScore[];
  top_concerns: ScaleScore[];
  interpretation: InterpretationData;
  safety_triggered: boolean;
}

export interface InterpretationData {
  title: string;
  summary: string;
  recommendations: string[];
  therapy_prompts: string[];
  evidence_note: string;
}

export interface InterpretationConfig {
  scale: ScaleType;
  level: SeverityLevel;
  version: VersionType;
  title: string;
  summary: string;
  recommendations: string[];
  therapy_prompts: string[];
}

export interface UITexts {
  welcome: {
    title: string;
    subtitle: string;
    disclaimer: string;
    start_button: string;
  };
  topic: {
    title: string;
    options: Record<TopicType, string>;
  };
  depth: {
    title: string;
    quick: { label: string; duration: string };
    deep: { label: string; duration: string };
  };
  questions: {
    timeframe: string;
    answer_labels: string[];
  };
  safety: {
    title: string;
    message: string;
    emergency_text: string;
    actions: {
      book_urgent: string;
      message: string;
      continue: string;
    };
  };
  results: {
    title: string;
    evidence_note: string;
    lead_form_title: string;
    cta_book: string;
    cta_download: string;
  };
  lead_form: {
    email_placeholder: string;
    telegram_placeholder: string;
    consent_text: string;
    submit_button: string;
  };
}

export interface AnalyticsEvent {
  event: string;
  session_id: string;
  topic?: TopicType;
  version?: VersionType;
  question_id?: string;
  timestamp: number;
}

export interface WebhookPayload {
  session_id: string;
  topic: TopicType;
  version: VersionType;
  scores: Record<string, number>;
  top_concerns: string[];
  contact_email?: string;
  contact_telegram?: string;
  raw_answers?: Record<string, AnswerValue>;
}
