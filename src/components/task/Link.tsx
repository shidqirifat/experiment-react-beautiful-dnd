type LinkProps = { total: number | undefined };

export const Link = ({ total }: LinkProps) => {
  if (!total) return null;
  return (
    <div>
      <h4 className="text-gray-600 text-sm">🔗 {total}</h4>
    </div>
  );
};
