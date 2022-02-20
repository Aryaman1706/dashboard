import type { NextComponentType, NextPageContext } from "next";
import type { TNewsItem } from "./types";
import styles from "../../styles/NewsItem.module.css";

type Props = {
  newsItem: TNewsItem;
};

const NewsItem: NextComponentType<NextPageContext, {}, Props> = ({
  newsItem,
}) => {
  const { id, title, body } = newsItem;

  return (
    <div className={styles.news_item_container}>
      <h3 className={styles.news_item_id}># {id}</h3>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
};

export default NewsItem;
