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
    finalNote?: string;
    chips: string[];
  };
  services: {
    title: string;
    audience?: string;
    finalNote?: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    title: string;
    subtitle?: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  approach: {
    title: string;
    subtitle?: string;
    principles: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  about: {
    title: string;
    name: string;
    role: string;
    description: string;
    experience: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    approach: {
      title: string;
      text: string;
    };
    philosophy: {
      title: string;
      text: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    formats: Array<{
      title: string;
      duration: string;
      price: string;
      platform?: string;
      location?: string;
      locationNote?: string;
      cancellation: string;
      note: string;
    }>;
    paymentNote: string;
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
    descriptionNote: string;
    subtitle: string;
    phone: string;
    phoneLink: string;
    email: string;
    emailLink: string;
    instagram: {
      username: string;
      link: string;
    };
    channel: {
      text: string;
      link: string;
    };
    messageTemplate: string;
    telegramLink: string;
    disclaimer: string;
  };
  disclaimer: {
    title: string;
    content: string;
    emergencyServices: {
      title: string;
      services: Array<{
        name: string;
        phone?: string;
        website?: string;
      }>;
    };
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
