import Banner from "@/components/home/Banner";
import Marquee from "@/components/home/Marquee";
import Partners from "@/components/home/Partners";
import About from "@/components/home/About";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import Promo from "@/components/home/Promo";
import Trainers from "@/components/home/Trainers";
import BlogSection from "@/components/home/BlogSection";
import { CallToAction } from "@/components/shared/CallToAction";

export default function Home() {
  return (
    <main className="relative" style={{ overflowX: "clip" }}>
      <Banner />
      <Marquee />
  

      <FeaturedClasses />
      <Promo />

      <BlogSection />
            <CallToAction />
    </main>
  );
}
