import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Featured } from "@/components/home/Featured";
import { OurStory } from "@/components/home/OurStory";
import { TrendingItems } from "@/components/home/TrendingItems";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <OurStory />
      <TrendingItems />
    </>
  );
}
