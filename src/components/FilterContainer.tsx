"use client";

import { type Category } from "@/types/category";
import { MouseEventHandler } from "react";

const colors: { [key: number]: string } = {
  1: "#66c2ff",
  2: "#ff6666",
  3: "#ffd700",
  4: "#98fb98",
  5: "#fa8072",
  6: "#c8a2c8",
  7: "#ff66b2",
  8: "#708090",
  9: "#c0c0c0",
  10: "#008080",
};

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
