import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "查看全部",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="inline-link">
          {linkLabel} <span>→</span>
        </Link>
      ) : null}
    </div>
  );
}
