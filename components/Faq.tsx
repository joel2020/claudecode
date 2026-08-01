export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <div className="faq__answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
