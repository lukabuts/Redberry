import Posts from "./posts";

export default interface blogProps {
  posts: Posts[];
  postsLoading: boolean;
  postsError: boolean;
  post: Posts;
}
