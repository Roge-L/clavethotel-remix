import { Marked } from "marked";

const UNSAFE_PROTOCOL = /^\s*(javascript|data|vbscript):/i;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Post bodies are stored as markdown in Supabase and rendered with
 * `dangerouslySetInnerHTML`, so raw HTML in the source is escaped rather than
 * passed through, and link/image URLs are checked for script-bearing
 * protocols. Only tags that markdown itself produces reach the page.
 */
const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      if (UNSAFE_PROTOCOL.test(href)) return text;
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      const external = /^https?:\/\//i.test(href);
      const relAttr = external ? ' rel="noopener noreferrer" target="_blank"' : "";
      return `<a href="${escapeHtml(href)}"${titleAttr}${relAttr}>${text}</a>`;
    },
    image({ href, title, text }) {
      if (UNSAFE_PROTOCOL.test(href)) return escapeHtml(text);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(
        text
      )}"${titleAttr} loading="lazy" decoding="async">`;
    },
  },
});

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string;
}

/** Plain-text excerpt for meta descriptions and article summaries. */
export function excerpt(source: string, maxLength = 155): string {
  const text = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(" ", maxLength - 1))}…`;
}
