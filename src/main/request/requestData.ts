import { PROFILE } from '../../profile';

/** A bubble's content. `link` is shown after `text`, followed by `after`.
 *  Links starting with "/" stay inside the site. */
export type Reply = {
  text: string;
  link?: { label: string; href: string };
  after?: string;
};

// Each answer can span several bubbles.
export type Question = {
  id: string;
  question: string;
  answer: (string | Reply)[];
};

export const INTRO = ['Hey, got your message.', 'Got questions for me?'];

export const QUESTIONS: Question[] = [
  {
    id: 'who',
    question: 'Who are you?',
    answer: [
      'A nerd, a software engineer, a tech enthusiast',
      'I like making cool stuff',
    ],
  },
  {
    id: 'site',
    question: "What's with this site?",
    answer: [
      'I styled it to look like the Persona 5 UI',
      {
        text: 'Pretty sick, right? If not, you can find my info with no frills on the ',
        link: { label: 'Help page', href: '/help' },
      },
    ],
  },
  {
    id: 'roles',
    question: 'What roles are you open to?',
    answer: ['Anything full-stack or frontend, remote or hybrid preferred!'],
  },
  {
    id: 'other-languages',
    question: "You don't know [THIS LANGUAGE]?",
    answer: [
      'If not, I love learning new ones!',
      "I think if AI is going to write our code, the barrier to entry is knowing what you're doing.",
      "Which I believe I do. So I'm open to other languages!",
    ],
  },
  {
    id: 'unfinished',
    question: 'You have a lot of unfinished repos',
    answer: [
      'Well, yeah...my GitHub is where I store hobby projects',
      'I have a lot of hobbies and not enough time to finish them all',
      "Also that wasn't a question",
    ],
  },
];

/** Sent once every question has been asked. `link` is shown between the two
 *  halves of the text. */
export const OUTRO: Reply = {
  text: "That's all I've got! If you have more questions, reach out to me via ",
  link: { label: 'LinkedIn', href: PROFILE.linkedin },
  after: '!',
};
