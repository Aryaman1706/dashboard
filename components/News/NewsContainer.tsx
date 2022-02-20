import type { NextComponentType, NextPageContext } from "next";
import type { TNewsItem } from "./types";
import NewsItem from "./NewsItem";
import styles from "../../styles/NewsContainer.module.css";

type Props = {
  news: TNewsItem[];
};

const NewsContainer: NextComponentType<NextPageContext, {}, Props> = ({
  news,
}) => {
  return (
    <div className={styles.news_container}>
      {news.map((newsItem) => (
        <NewsItem key={newsItem.title} newsItem={newsItem} />
      ))}
    </div>
  );
};

export default NewsContainer;
