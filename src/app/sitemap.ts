import { BlogPostsResponse } from "@/models/BlogPost";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
    // lastModified: new Date(post.updatedAt),
    // changeFrequency:,
    // priority:
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}about`,
      lastModified: new Date(),
    },
    {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/company`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/history`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/status`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/contact`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/company`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/zebrafish`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/service/CNS_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/service/Meta_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/service/Onco_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/service/Gene_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/service/Toxicology`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/development/pharmaceuticals`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/development/pipeline`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/content/development/open_innovation`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/en/notice`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}en/news`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        lastModified: new Date(),
      },
            {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/company`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/history`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}status`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/contact`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/company`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/zebrafish`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/service/CNS_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/service/Meta_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/service/Onco_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/service/Gene_FIT`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/service/Toxicology`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/development/pharmaceuticals`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/development/pipeline`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}content/development/open_innovation`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}notice`,
        lastModified: new Date(),
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}news`,
        lastModified: new Date(),
      },
  ];
} 