import Data from "../../Types/Data";
function Categories({ data }: { data: Data[] }) {
  return (
    <>
      {data.map((item: Data) => {
        return (
          <div
            className="cursor-pointer rounded-component_item px-component_item_x py-component_item_y"
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
