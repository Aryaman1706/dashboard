import type { GetStaticProps, NextPage } from "next";
import type { TNewsItem } from "../components/News/types";
import type { TDataItem } from "../types/newsPage.types";
import NewsContainer from "../components/News/NewsContainer";

type Props = {
  news: TNewsItem[];
};

const News: NextPage<Props> = ({ news }) => {
  return <NewsContainer news={news} />;
};

export default News;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    const news = data.map((obj: TDataItem) => ({
      id: obj.id,
      title: obj.title,
      body: obj.body,
    }));

    return { props: { news } };
  } catch (error) {
    return { props: { news: [] } };
  }
};
