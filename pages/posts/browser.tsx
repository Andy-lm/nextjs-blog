import { UAParser } from "ua-parser-js";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  };
};

const Browser: NextPage<Props> = (props) => {
  const { browser } = props;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let w = document.documentElement.clientWidth;
    setWidth(w);
  }, []);

  return (
    <div>
      <h3>您使用的浏览器是--服务端渲染</h3>
      <span>{browser.name}</span>
      <h3>您浏览器的宽度为--客户端渲染</h3>
      <span>{width}px</span>
      <h3>其他内容</h3>
      <span>
        {browser.version}-{browser.major}
      </span>
    </div>
  );
};

export default Browser;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers["user-agent"];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
    },
  };
};
