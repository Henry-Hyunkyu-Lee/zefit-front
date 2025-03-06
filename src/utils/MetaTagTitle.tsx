interface MetaTagTitleProps {
  title: string;
  ko?: boolean;
  description: string,
  keywords: string[]
};

export default function MetaTagTitle({ title, description, keywords, ko = true }: MetaTagTitleProps) {
  return (
    <title>
      {(title?.length > 0)
        ? `${title} | ${(ko) ? '제핏' : 'ZEFIT'}`
        : `${(ko) ? '제핏' : 'ZEFIT'}`}
    </title>
      <meta name="description" content={description || ""} />
      <meta name="keywords" content={keywords?.join(', ') || ""} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      </>
  )
};
