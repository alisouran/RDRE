import React from "react";
import dynamic from "next/dynamic";
const App = dynamic(() => import("../components/App"), { ssr: false });
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>حذف تکراری‌های دو فایل اکسل</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Katibeh&display=swap"
          rel="stylesheet"
        />
      </Head>
      <App />
    </>
  );
}
