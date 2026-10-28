import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";

const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export async function renderMdx(source: string, components?: MDXComponents) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
  });
  return content;
}
