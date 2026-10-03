/* "22nd Nov · 12:00 PM" on one line: day number enlarged, ordinal kept lowercase
   even inside `uppercase` text. */
export const EventDate = ({ date, time, className = '' }: { date: string; time: string; className?: string }) => {
  const m = date.match(/^(\d+)(st|nd|rd|th)?(\s.*)$/i);
  return (
    <span className={`whitespace-nowrap ${className}`}>
      {m ? (
        <>
          <span className="text-[1.55em] leading-none tracking-[.04em]">{m[1]}</span>
          {m[2] ? <span className="normal-case">{m[2]}</span> : null}
          {m[3]}
        </>
      ) : date}
      <span className="mx-1.5 opacity-60">·</span>
      {time}
    </span>
  );
};
