import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Require from "../../utils/Require";
import { GET_ARTICLE_BY_ID } from "../../utils/pathMap";
import MarkdownParse from "../../components/MarkdownParse";

export default function Index(props) {
  const [articleInformation, setArticleInformation] = useState(undefined);
  const { articleId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await Require.get(GET_ARTICLE_BY_ID, {
        params: {
          articleId: articleId,
        },
      });
      if (res.data.code === 1) setArticleInformation(res.data.data);
      else
        setArticleInformation({
          title: "文章不存在",
          content: "文章不存在，若你认为这是一个错误，请向管理员联系",
        });
    };
    fetchData();
  }, [articleId]);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      {/* 背景 */}
      <div className="bg-sky h-screen w-screen bg-center fixed inset-0 -z-10" />
      {/* 白色大卡片 */}
      <div className="bg-gray-200 bg-opacity-80 p-10 rounded-3xl md:w-11/12 md:mx-auto md:my-10">
        {/* 博客标题副标题导航栏 */}
        <div className="flex flex-col items-center justify-between h-48 md:items-start">
          {/* flex浮动控制用 */}
          <div></div>
          {/* 博客名 */}
          <div
            className="text-5xl font-kaiti text-center text-gray-600 my-2 hover:text-purple-600 
          transform transition-all md:ml-14"
          >
            小怪兽
          </div>
          {/* 座右铭 */}
          <div className="text-gray-400 text-sm font-kaiti -mt-4 md:ml-14">
            啊手动阀打发
          </div>
          {/* 导航栏 */}
          <div className="flex items-center justify-center w-full border-t border-b border-gray-300 h-12 md:justify-between">
            <ul className="flex justify-between mx-4 font-kaiti w-5/6 text-gray-600 md:w-3/5 md:ml-10">
              <Link
                to="/"
                className="hover:text-purple-600 transform transition-all"
              >
                首页
              </Link>
              <Link
                to="/personalPage"
                className="hover:text-purple-600 transform transition-all"
              >
                个人
              </Link>
              <Link
                to="/articleList/1"
                className="hover:text-purple-600 transform transition-all"
              >
                文章
              </Link>
              <Link
                to="/QAList/1"
                className="hover:text-purple-600 transform transition-all"
              >
                问答
              </Link>
            </ul>
            {/* 网站信息，点击量之类的 */}
            <ul
              className="hidden md:mx-6 md:text-gray-600 md:font-kaiti md:text-xs md:inline-block 
                      md:translate-y-3 md:transform"
            >
              <li className="inline ">
                点击量<span>?</span>
              </li>
              <li className="inline ">
                运行时间<span>?</span>
              </li>
            </ul>
          </div>
        </div>
        {/* 文章显示，包括了题目和内容，这里的relative是为了markdown那个toc的定位 */}
        {articleInformation !== undefined && (
          <div>
            <div
              className="mt-5 mb-2 border-l-3 border-blue-500 font-kaiti text-xl text-purple-500
            font-bold py-2 pl-3"
            >
              <div className="transform hover:translate-x-8 hover:text-red-500 duration-500 cursor-pointer">
                {articleInformation !== undefined && articleInformation.title}
              </div>
            </div>
            <MarkdownParse
              markdown={articleInformation.content}
            ></MarkdownParse>
          </div>
        )}
        {/* 向上翻页按钮 */}
        <div
          className="fixed right-2 bottom-8 md:right-16 md:animate-bounce cursor-pointer"
          onClick={scrollToTop}
        >
          <svg
            t="1632401792928"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2400"
            width="50"
            height="50"
          >
            <path
              d="M554.666667 268.8v601.6h-85.333334V268.8L337.066667 401.066667 277.333333 341.333333 512 106.666667 746.666667 341.333333l-59.733334 59.733334L554.666667 268.8z"
              fill="#8a8a8a"
              p-id="2401"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
