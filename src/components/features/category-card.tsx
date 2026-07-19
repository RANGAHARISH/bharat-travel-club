import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  icon: string;
}

export function CategoryCard({ category, icon }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-xl border-2 border-brand-teal/10 bg-white p-6",
        "transition-all duration-200 hover:border-brand-teal hover:shadow-md hover:-translate-y-1"
      )}
    >
      {/* Stamp ring motif */}
      <div className="stamp-ring flex items-center justify-center w-16 h-16 bg-brand-cream text-3xl group-hover:bg-brand-teal/5 transition-colors">
        {icon}
      </div>
      <span className="font-serif text-lg font-semibold text-brand-ink group-hover:text-brand-teal transition-colors">
        {category.name}
      </span>
      {category.description && (
        <span className="text-sm text-brand-ink/60 text-center">{category.description}</span>
      )}
    </Link>
  );
}
