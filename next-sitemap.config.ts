import { IConfig } from "next-sitemap";

const config: IConfig = {
  siteUrl: "https://pitikbooth.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000, // Ensures all URLs fit into one file
  exclude: [], // Add any pages you don’t want indexed
};

export default config;
