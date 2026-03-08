export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-10 px-6 text-center"
      style={{
        background: "oklch(0.26 0.08 15)",
        borderTop: "1px solid oklch(0.35 0.08 15)",
      }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
        {/* Heart row */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {(["sm", "md", "sm"] as const).map((sz, idx) => (
            <svg
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
              key={idx}
              role="img"
              aria-label="Heart"
              width={sz === "md" ? 12 : 8}
              height={sz === "md" ? 12 : 8}
              viewBox="0 0 24 24"
              fill="oklch(0.65 0.15 12)"
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          ))}
        </div>

        <p
          className="font-body text-xs"
          style={{ color: "oklch(0.72 0.05 15)" }}
        >
          © {year}. Built with{" "}
          <svg
            role="img"
            aria-label="love"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="oklch(0.65 0.18 12)"
            className="inline mx-0.5 align-[-1px]"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>{" "}
          using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.80 0.10 65)" }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
