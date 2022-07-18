import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";

export default function FirstPort() {
  return (
    <Layout>
      <Head>
        <title>第一个Post页面</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>返回首页</a>
        </Link>
      </h2>
    </Layout>
  );
}
