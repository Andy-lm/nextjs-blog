import fs,{promises as fsPromise} from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * 注意：gray-matter可以用来解析markdown语法中前面的
 * ---
    title: "什么是Npx"
    date: "2020-07-17"
   ---
 */

// process.cwd()可以用来获取当前路径 current working directory
const postsDirectory = path.join(process.cwd(), "posts");

/**
 * 在这里我们也可以：
 * 通过fetch发生请求来获取一些异步的数据
 * 可以进行数据库查询
 * */
export async function getSortedPostsData() {
  // Get file names under /posts
  let fileNames = await fsPromise.readdir(postsDirectory);
  fileNames = fileNames.filter((fileName) => {
    return /\.md$/.test(fileName);
  });
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data, // { title: '说说这一年的一些感想', date: '2022-07-18' }
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  let fileNames = fs.readdirSync(postsDirectory);
  fileNames = fileNames.filter((fileName) => {
    return /\.md$/.test(fileName);
  });
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
