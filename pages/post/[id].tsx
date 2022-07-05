import Time from "@/components/Time";
import { format } from "date-fns";
import useRealTimes from "hooks/useRealTimes";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { PostTypes } from ".";

const DynamicSSGTime = dynamic(() => import("@/components/Time"), {
  ssr: false,
});

const PostDetail = ({
  postDetail,
  time,
}: {
  postDetail: PostTypes;
  time: any;
}) => {
  const CSR_TIME = useRealTimes();
  return (
    <div style={{ padding: "10px" }}>
      <span>{postDetail.id}</span>
      <p>{postDetail.body}</p>
      <DynamicSSGTime time={time} realTime="" />
      <DynamicSSGTime realTime={CSR_TIME} />
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
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const postId = ctx.params?.id || "1";
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const postDetail = await res.json();
  const timesRes = await fetch("https://worldtimeapi.org/api/ip");
  const { datetime } = await timesRes.json();

  return {
    props: {
      postDetail,
      time: datetime,
    },
    revalidate: 10,
  };
};
