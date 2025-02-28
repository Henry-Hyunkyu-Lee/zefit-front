interface MetaTagTitleProps {
  title: string;
  description?: string;
  keywords?: string[];
  ko?: boolean;
};

export default function MetaTagTitle({ title, description, keywords, ko = true }: MetaTagTitleProps) {
  return (
  <>
    <title>
      {(title?.length > 0)
        ? `${title} | ${(ko) ? '제핏' : 'zefit'}`
        : `${(ko) ? '제핏' : 'zefit'}`}
    </title>
	<meta name="description" content={description || "Default description"} />
    <meta name="keywords" content={keywords?.join(', ') || "default,keywords"} />
  </>
  )
};