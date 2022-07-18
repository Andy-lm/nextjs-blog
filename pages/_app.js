import "../styles/global.css";

// 这个组件引用了全局样式
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
