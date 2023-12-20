import { Context } from "../../App";
import { useContext } from "react";

function Post() {
  const [signedIn, setSignedIn] = useContext(Context);
  return (
    <div>
      {signedIn ? (
        "Create Post"
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
