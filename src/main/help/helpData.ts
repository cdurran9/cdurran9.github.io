// Condensed from the resume for the no-frills Help page.
export type Role = {
  company: string;
  title: string;
  dates: string;
  location: string;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    company: 'ReliaQuest',
    title: 'Senior Software Engineer',
    dates: 'Nov 2021 – Present',
    location: 'Salt Lake City, UT',
    points: [
      'Sole frontend engineer on a tool for running threat hunts across every customer at once, saving hundreds of hours per hunt and leading to several early threat-actor detections.',
      'Led the frontend integration of Digital Risk Protection into GreyMatter, a new upsell product that brought in several million in revenue.',
      'Built the unified UI for the GreyMatter AI chatbot (used weekly by 50%+ of users) and a fully customizable self-service reporting page.',
      'Leads the biweekly frontend meeting on coding standards, AI practices and training; resolves production incidents on call across databases, AWS and RabbitMQ.',
    ],
  },
  {
    company: 'PeakView Solutions',
    title: 'Full-stack Developer',
    dates: 'Oct 2019 – Nov 2021',
    location: 'Colorado Springs, CO (remote)',
    points: [
      "Primary frontend developer on a new customer scheduling app, owning the Angular codebase's architecture and practices from the ground up.",
      'Built UI- and API-side controllers in C# to connect frontend views to backend endpoints.',
      'Worked directly with test customers on usability and features like QuickBooks integration, and trained engineers on the codebase.',
    ],
  },
];
