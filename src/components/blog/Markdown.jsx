import { useMemo } from "react";

const INLINE =
  /(!?\[[^\]]*\]\([^)]+\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;

function renderInline(text, keyPrefix) {
  const parts = [];
  let last = 0;
  let match;
  let i = 0;

  while ((match = INLINE.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    const tok = match[0];
    const key = keyPrefix + i;

    if (tok.startsWith("![")) {
      const m = /!\[([^\]]*)\]\(([^)]+)\)/.exec(tok);
      parts.push(
        <img
          key={key}
          src={m[2]}
          alt={m[1]}
          className="my-6 w-full rounded-2xl border border-[var(--border)]"
        />
      );
    } else if (tok.startsWith("[")) {
      const m = /\[([^\]]*)\]\(([^)]+)\)/.exec(tok);
      parts.push(
        <a
          key={key}
          href={m[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] underline underline-offset-2"
        >
          {m[1]}
        </a>
      );
    } else if (tok.startsWith("`")) {
      parts.push(
        <code
          key={key}
          className="rounded-md bg-[var(--surface-muted)] px-1.5 py-0.5 text-[0.9em] text-[var(--text-primary)]"
        >
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith("**")) {
      parts.push(
        <strong key={key} className="font-semibold text-[var(--text-primary)]">
          {tok.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(<em key={key}>{tok.slice(1, -1)}</em>);
    }

    last = match.index + tok.length;
    i += 1;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function parse(content) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const buf = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1;
      out.push({ type: "code", text: buf.join("\n") });
      continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      out.push({ type: "h" + level, text: line.replace(/^#+\s/, "") });
      i += 1;
      continue;
    }

    if (/^(-|\*)\s/.test(line)) {
      const buf = [];
      while (i < lines.length && /^(-|\*)\s/.test(lines[i])) {
        buf.push(lines[i].replace(/^(-|\*)\s/, ""));
        i += 1;
      }
      out.push({ type: "ul", items: buf });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      out.push({ type: "ol", items: buf });
      continue;
    }

    if (line.startsWith(">")) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      out.push({ type: "quote", text: buf.join(" ") });
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      out.push({ type: "hr" });
      i += 1;
      continue;
    }

    const buf = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3}\s|```|>|(-|\*)\s|\d+\.\s)/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i += 1;
    }
    out.push({ type: "p", text: buf.join(" ") });
  }

  return out;
}

export default function Markdown({ content = "" }) {
  const blocks = useMemo(() => parse(content), [content]);

  return (
    <div className="space-y-5 text-[var(--text-secondary)]">
      {blocks.map((b, idx) => {
        const k = "b" + idx + "-";

        switch (b.type) {
          case "h1":
          case "h2":
            return (
              <h2
                key={idx}
                className="mt-10 text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
              >
                {renderInline(b.text, k)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="mt-8 text-lg font-semibold text-[var(--text-primary)]"
              >
                {renderInline(b.text, k)}
              </h3>
            );
          case "code":
            return (
              <pre
                key={idx}
                className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-primary)]"
              >
                <code>{b.text}</code>
              </pre>
            );
          case "ul":
            return (
              <ul key={idx} className="list-disc space-y-2 pl-6">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it, k + j)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="list-decimal space-y-2 pl-6">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it, k + j)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-[var(--accent)] pl-4 italic"
              >
                {renderInline(b.text, k)}
              </blockquote>
            );
          case "hr":
            return <hr key={idx} className="border-[var(--border)]" />;
          default:
            return (
              <p key={idx} className="leading-8">
                {renderInline(b.text, k)}
              </p>
            );
        }
      })}
    </div>
  );
}
