export function formatSalary(min?: number, max?: number, currency = "NGN") {
  if (!min && !max) return "Salary undisclosed";
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  const symbol = currency === "NGN" ? "₦" : currency + " ";
  if (min && max) return `${symbol}${fmt(min)} - ${symbol}${fmt(max)}`;
  return `${symbol}${fmt((min ?? max)!)}`;
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
