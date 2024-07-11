import qs from "qs"
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { getHomePageData } from "@/components/data/loaders";

import { HeroSection } from "@/components/custom/HeroSection";
import { FeatureSection } from "@/components/custom/FeaturesSection";

function blockRenderer(block: any) {
//  console.log("block.__component");
//  console.log(block.__component);
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.feature-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {

  const strapiData = await getHomePageData();

  const { blocks } = strapiData;
//  console.log("####a#####")
//  console.dir(blocks, {depth: null})
//  console.log("####b#####")
  if (!blocks) return <p>No sections found</p>;

  return (
    <main>{blocks.map(blockRenderer)}</main>
  );
}