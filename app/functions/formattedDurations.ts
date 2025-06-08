const formatDuration = (duration: string) => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) return "N/A";

  const h = matches[1] ? `${matches[1]}h ` : "";
  const m = matches[2] ? `${matches[2]}m ` : "";
  const s = matches[3] ? `${matches[3]}s` : "";

  return `${h}${m}${s}`.trim();
};

export default formatDuration;
