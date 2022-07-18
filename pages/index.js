import Head from "next/head";
import Link from "next/link";
import { Tooltip } from "antd";
import "antd/dist/antd.css";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import styles from "./index.module.css";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          你好我是南橘北枳，是一名前端程序员，热爱学习、热爱分享，欢迎关注我的微信公众号「
          <Tooltip
            title={<img src="/images/gzh.jpg"></img>}
            placement="bottom"
            color="#fff"
          >
            <span className={styles.tips}>南橘前端</span>
          </Tooltip>
          」。
        </p>
        <p>
          （这是一个简单的通过Next.js实现的简单博客，如果你也感兴趣可以看
          <a href="https://nextjs.org/learn/foundations/about-nextjs">
            这篇教程
          </a>
          ）
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>博客</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
