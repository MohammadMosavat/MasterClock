const Formatted = (isoDate: Date): string => {
  const date = new Date(isoDate);

  const formatted = `${String(date.getFullYear())} ${date.toLocaleString(
    "en-US",
    {
      month: "long",
      day: "2-digit",
    }
  )} `;

  return formatted;
};

export default Formatted;
