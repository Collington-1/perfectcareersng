// Lightweight table-of-contents helper for the static <h2> blog body HTML
// in mock-data.ts. Swap for a Tiptap-JSON heading walk once posts are
// stored in Postgres — the {id, text}[] shape callers use won't change.
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2>(.*?)<\/h2>/g)];
  return matches.map((m) => ({ id: slugify(m[1]), text: m[1] }));
}

export function injectHeadingIds(html: string): string {
  return html.replace(/<h2>(.*?)<\/h2>/g, (_match, text) => `<h2 id="${slugify(text)}">${text}</h2>`);
}
