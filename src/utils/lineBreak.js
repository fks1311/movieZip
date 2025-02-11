export const line_break = (word) => {
  return (
    <>
      {word.split(" ").map((txt, idx) => (
        <div key={idx}>{txt}</div>
      ))}
    </>
  );
};
