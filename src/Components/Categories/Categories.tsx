import { useEffect, useState } from "react";
import Data from "../../Types/data";
import axios from "axios";
interface CategoriesProps {
  selectedFilters: number[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<number[]>>;
}

function Categories({ selectedFilters, setSelectedFilters }: CategoriesProps) {
  const [categories, setCategories] = useState([]);
  // Get Categories Data From API
  useEffect(() => {
    axios
      .get("https://api.blog.redberryinternship.ge/api/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      localStorage.removeItem("filters");
      return;
    }
    localStorage.setItem("filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  function handleClick(id: number) {
    const find = selectedFilters.find((x) => x === id);
    if (!find) {
      setSelectedFilters([...selectedFilters, id]);
    } else {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    }
  }

  return (
    <>
      {categories.map((item: Data) => {
        return (
          <div
            onClick={() => {
              handleClick(item.id);
            }}
            className={`cursor-pointer rounded-component_item px-component_item_x py-component_item_y ${
              selectedFilters.find((x: number) => x === item.id) &&
              "border-black border-input"
            }`}
            key={item.id}
            style={{ background: item.background_color }}
          >
            <p className="w-max" style={{ color: item.text_color }}>
              {item.title}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default Categories;
