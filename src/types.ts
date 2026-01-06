export interface ContentData {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    microText: string;
    cta: {
      primary: {
        text: string;
        link: string;
      };
      secondary: {
        text: string;
        link: string;
      };
    };
  };
  suitableFor: {
    title: string;
    items: string[];
    chips: string[];
  };
  services: {
    title: string;
    audience: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    title: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  approach: {
    title: string;
    description: string;
    method: string;
    bullets: string[];
  };
  about: {
    title: string;
    description: string;
    facts: Array<{
      label: string;
      value: string;
    }>;
  };
  pricing: {
    title: string;
    items: string[];
    microText: string;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contacts: {
    title: string;
    description: string;
    responseTime: string;
    messageTemplate: string;
    buttons: Array<{
      text: string;
      link: string;
    }>;
    disclaimer: string;
  };
  disclaimer: {
    title: string;
    content: string;
    confidentiality: {
      title: string;
      content: string;
    };
  };
  navigation: {
    items: Array<{
      label: string;
      anchor: string;
    }>;
  };
}
