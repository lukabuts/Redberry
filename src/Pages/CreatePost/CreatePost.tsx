import { Context } from "../../App";
import { useContext } from "react";
import Header from "../../Components/Header/Header";
import FormComponent from "../../Components/FormComponent/FormComponent";

function Post() {
  const [signedIn, _] = useContext(Context);
  return (
    <div>
      <Header creatingPost={true} />
      {signedIn ? (
        <FormComponent />
      ) : (
        <>
          <h1 className="mt-20 text-center text-err text-24">
            თქვენ არ ხართ სისტემაში შესული
          </h1>
        </>
      )}
    </div>
  );
}

export default Post;
