interface MetaTagTitleProps {
  title: string;
  ko?: boolean;
};

export default function MetaTagTitle({ title, ko = true }: MetaTagTitleProps) {
  return (
    <title>
      {(title?.length > 0)
        ? `${title} | ${(ko) ? '제핏' : 'ZEFIT'}`
        : `${(ko) ? '제핏' : 'ZEFIT'}`}
    </title>
  )
};
