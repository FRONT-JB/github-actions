import { GetStaticPropsContext } from "next";
import { PostTypes } from ".";

const PostDetail = ({ postDetail }: { postDetail: PostTypes }) => {
  return (
    <div style={{ padding: "10px" }}>
      <span>{postDetail.id}</span>
      <p>{postDetail.body}</p>
    </div>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: PostTypes[] = await response.json();
  const paths = posts.map((post) => ({ params: { id: String(post.id) } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const postId = ctx.params?.id || "1";
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const postDetail = await res.json();
  return {
    props: {
      postDetail,
    },
  };
};
