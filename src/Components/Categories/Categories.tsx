import { useEffect } from "react";
import Data from "../../Types/Data";

interface CategoriesProps {
  data: Data[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

function Categories({
  data,
  selectedFilters,
  setSelectedFilters,
}: CategoriesProps) {
  function handleClick(title: string) {
    const find = selectedFilters.find((x: string) => x === title);
    if (!find) {
      setSelectedFilters([...selectedFilters, title]);
    } else {
      setSelectedFilters(selectedFilters.filter((x: string) => x !== title));
    }
  }

  useEffect(() => {
    if (selectedFilters.length === 0) {
      localStorage.removeItem("filters");
      return;
    }
    localStorage.setItem("filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  return (
    <>
      {data.map((item: Data) => {
        return (
          <div
            onClick={() => {
              handleClick(item.title);
            }}
            className={`cursor-pointer rounded-component_item px-component_item_x py-component_item_y ${
              selectedFilters.find((x: string) => x === item.title)
                ? "border-black_ border-2"
                : ""
            }`}
            key={item.id}
            style={{ background: item.background_color }}
          >
            <p style={{ color: item.text_color }}>{item.title}</p>
          </div>
        );
      })}
    </>
  );
}

export default Categories;
