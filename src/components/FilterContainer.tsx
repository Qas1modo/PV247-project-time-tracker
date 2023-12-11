"use client";

import { type Category } from "@/types/category";
import { MouseEventHandler } from "react";
import { colors } from "@/utils/utils";

const FilterButton = ({
  category,
  onClickFilter,
}: {
  category: { id: number; name: string };
  onClickFilter: MouseEventHandler<HTMLInputElement>;
}) => {
  return (
    <input
      id={category.id.toString()}
      type="checkbox"
      aria-label={category.name}
      className="btn btn-outline border-4"
      style={{ borderColor: colors[category.id], color: colors[category.id] }}
      onClick={onClickFilter}
    />
  );
};

export const FilterContainer = ({
  categories,
  onClickFilter,
}: {
  categories: Category[];
  onClickFilter: MouseEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      {categories.map((category) => {
        return (
          <FilterButton
            key={category.id}
            category={category}
            onClickFilter={onClickFilter}
          />
        );
      })}
    </>
  );
};
