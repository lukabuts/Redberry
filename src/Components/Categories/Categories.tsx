import { useEffect } from "react";
import Data from "../../Types/Data";
function Categories({
  data,
  selectedFilters,
  setSelectedFilters,
}: {
  data: Data[];
  selectedFilters: string[];
}) {
  function handleClick(title) {
    const find = selectedFilters.find((x) => x === title);
    if (!find) {
      setSelectedFilters([...selectedFilters, title]);
    } else {
      setSelectedFilters(selectedFilters.filter((x) => x !== title));
    }
    return;
  }

  useEffect(() => {
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
              selectedFilters.find((x) => x === item.title)
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
