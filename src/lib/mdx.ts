import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });
  return content;
}
