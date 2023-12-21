import Posts from "./posts";
export default interface HomeProps {
  posts: Posts[];
  postsLoading: boolean;
  postsError: boolean;
}
