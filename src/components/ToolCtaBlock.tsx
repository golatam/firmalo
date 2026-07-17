import Link from "next/link";

export function ToolCtaBlock({
  heading,
  body,
  label,
  href = "#firmar-pdf-tool",
}: {
  heading: string;
  body: string;
  label: string;
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary-light px-6 py-8 text-center">
      <h3 className="text-lg sm:text-xl font-bold text-text">{heading}</h3>
      <p className="mt-2 text-text-secondary">{body}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        {label}
      </Link>
    </div>
  );
}
