import { useRouter } from "next/router";

export interface PostTypes {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsProps {
  post: PostTypes[];
}

const Posts = ({ post }: PostsProps) => {
  const router = useRouter();

  const handleRoute = (id: number) => {
    router.push(`post/${String(id)}`);
  };
  return (
    <ul>
      {post.map((list) => (
        <li key={list.id} onClick={() => handleRoute(list.id)}>
          <span>{list.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default Posts;

export const getServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const post = await response.json();
  return {
    props: {
      post,
    },
  };
};
