import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { prefersReducedMotion } from '../../persona/timing';
import { INTRO, OUTRO, QUESTIONS, type Reply } from './requestData';
import './RequestPage.css';

type Message = Reply & { id: number; from: 'me' | 'you' };

const TYPING_MS = 700;
// Matches the short-screen query in RequestPage.css, where the page scrolls
// instead of the phone.
const SHORT_SCREEN = '(max-height: 36rem)';
const BETWEEN_BUBBLES_MS = 450;

let nextId = 0;
const message = (from: Message['from'], reply: Reply | string): Message => ({
  id: nextId++,
  from,
  ...(typeof reply === 'string' ? { text: reply } : reply),
});

const INTRO_MESSAGES = INTRO.map((text) => message('me', text));

// The ⚡ outline turned on its side. Fat where it meets the bubble (x=40);
// the top edge steps down and the bottom edge steps up, like a Z, pinching
// the middle before the long taper to the point at the far left.
const BOLT = '40,2 17,4 19,11 0,12 25,27 23,18 40,28';

/** Lightning-bolt speech tail. Only the jagged sides are stroked, so the fill
 *  runs seamlessly into the bubble where the two overlap. */
function Tail() {
  return (
    <svg className="im-tail" viewBox="0 0 40 30" aria-hidden="true">
      <polygon points={BOLT} />
      <polyline points={BOLT} />
    </svg>
  );
}

const PORTRAIT = `${import.meta.env.BASE_URL}portrait.png`;

/** My portrait in its tilted frame; the head pokes up out of the top. */
function Avatar({ small = false }: { small?: boolean }) {
  return (
    <span className={`im-avatar${small ? ' im-avatar--small' : ''}`} aria-hidden="true">
      <span className="im-avatar__face" />
      <span className="im-avatar__portrait">
        <img src={PORTRAIT} alt="" />
      </span>
    </span>
  );
}

function Bubble({ msg, typing = false }: { msg?: Message; typing?: boolean }) {
  const from = msg?.from ?? 'me';
  return (
    <li className={`im-msg im-msg--${from}`}>
      {from === 'me' && (
        <Avatar />
      )}
      <div className="im-bubble">
        <Tail />
        {typing ? (
          <span className="im-typing" aria-label="Typing">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <p className="im-bubble__text">
            {msg?.text}
            {msg?.link && (
              <>
                {msg.link.href.startsWith('/') ? (
                  // In-site links go through the router, so the wipe plays.
                  <Link to={msg.link.href}>{msg.link.label}</Link>
                ) : (
                  <a href={msg.link.href} target="_blank" rel="noreferrer">
                    {msg.link.label}
                  </a>
                )}
                {msg.after}
              </>
            )}
          </p>
        )}
      </div>
    </li>
  );
}

/** Request page: a Persona 5-style IM phone used as an FAQ. */
export const RequestPage = () => {
  const [log, setLog] = useState<Message[]>(INTRO_MESSAGES);
  const [asked, setAsked] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  // Set when a picked question's button disappears and takes focus with it.
  const refocus = useRef(false);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Scroll the phone (or, on short screens, the page) so my latest message,
  // or the typing bubble, sits at the bottom of the view. The reply choices below it stay a
  // scroll away instead of pushing my answer off the top.
  // Only when I post: a visitor's message would aim at my previous bubble and
  // jump the view up before my reply pulls it back down.
  useEffect(() => {
    if (!typing && log[log.length - 1]?.from !== 'me') return;
    const el = scrollRef.current;
    const mine = el?.querySelectorAll<HTMLElement>('.im-msg--me');
    const last = mine?.[mine.length - 1];
    if (!el || !last) return;
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    if (window.matchMedia(SHORT_SCREEN).matches) {
      last.scrollIntoView({ block: 'end', behavior });
      return;
    }
    el.scrollTo({
      top: Math.max(0, last.offsetTop + last.offsetHeight - el.clientHeight + 24),
      behavior,
    });
  }, [log, typing]);

  // Once I've finished replying, hand focus to the next question (or, with
  // none left, the conversation) so keyboard users aren't dropped at the top.
  useEffect(() => {
    if (typing || !refocus.current) return;
    refocus.current = false;
    // Leave it be if they've moved focus somewhere else in the meantime.
    if (document.activeElement !== scrollRef.current) return;
    const next =
      choicesRef.current?.querySelector<HTMLElement>('.im-choice') ?? scrollRef.current;
    next?.focus({ preventScroll: true });
  }, [typing]);

  const ask = (id: string) => {
    const q = QUESTIONS.find((item) => item.id === id);
    if (!q || typing) return;
    // Hold focus on the conversation while the clicked button goes away.
    if (choicesRef.current?.contains(document.activeElement)) {
      scrollRef.current?.focus({ preventScroll: true });
      refocus.current = true;
    }
    setAsked((a) => [...a, id]);
    setLog((l) => [...l, message('you', q.question)]);

    // After the last question, sign off once the answer is done.
    const isLast = asked.length + 1 === QUESTIONS.length;
    const replies: (Reply | string)[] = isLast ? [...q.answer, OUTRO] : q.answer;

    // Type out each reply bubble in turn.
    let delay = 250;
    replies.forEach((reply, i) => {
      timers.current.push(window.setTimeout(() => setTyping(true), delay));
      delay += TYPING_MS;
      timers.current.push(
        window.setTimeout(() => {
          setLog((l) => [...l, message('me', reply)]);
          if (i === replies.length - 1) setTyping(false);
        }, delay),
      );
      delay += BETWEEN_BUBBLES_MS;
    });
  };

  const remaining = QUESTIONS.filter((q) => !asked.includes(q.id));

  return (
    <div className="im-screen">
      <section className="im-phone" aria-label="Messages">
        <header className="im-header">
          <span className="im-logo" aria-hidden="true">
            <span className="im-logo__i">I</span>
            <span className="im-logo__m">M</span>
          </span>
          <h1 className="im-sr">Request: questions and answers</h1>
          <span className="im-contact" aria-hidden="true">
            <Avatar small />
          </span>
        </header>

        {/* Messages and reply choices scroll together inside the phone. */}
        <div className="im-scroll" ref={scrollRef} tabIndex={0}>
          <ol className="im-log" aria-live="polite">
            {log.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}
            {typing && <Bubble typing />}
          </ol>

          <div className="im-choices" ref={choicesRef}>
            {remaining.length > 0 && (
              <>
                <p className="im-choices__label">Choose a reply</p>
                {remaining.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    className="im-choice"
                    disabled={typing}
                    onClick={() => ask(q.id)}
                  >
                    {q.question}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
