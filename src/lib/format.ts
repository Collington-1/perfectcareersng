// Meta descriptions need plain text — Job/Scholarship/Grant content is now
// a single rich-text HTML blob rather than a separate plain-text field.
export function stripHtmlToExcerpt(html: string, maxLength = 155) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export function formatDeadline(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
