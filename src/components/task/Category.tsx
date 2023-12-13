import { Category } from "../../types/reorder";

type CategoriesProps = { categories: Array<Category> | undefined };
type CategoryProps = { category: Category };

const CategoryItem = ({ category }: CategoryProps) => {
  return (
    <div
      key={category.id}
      className="px-4 py-1 rounded-md inline-flex w-max mr-2 mt-2"
      style={{ backgroundColor: category.color }}
    >
      <h3 className="text-xs font-medium">{category.name}</h3>
    </div>
  );
};

export const Categories = ({ categories }: CategoriesProps) => {
  if (!categories) return null;

  return (
    <div>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
