import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import Faq from "./components/home/Faq";
import News from "./components/home/News";
import Socials from "./components/home/Socials";

type HomeConfig = {
  bannerImages?: string[];
};
console.log(process.env.BACKEND_URL_DEV);
async function getHomeConfig(): Promise<HomeConfig | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Config/GetConfig`, { cache: "no-store" });
    if (!res.ok) return null;
    const value = await res.json();
    return value.home as HomeConfig;
  } catch {
    return null;
  }
}

export default async function Home() {
  const config = await getHomeConfig();

  const bannerImages = config?.bannerImages?.filter(Boolean) ?? [
    "/images/HomeCarousel/placeholder1.jpg",
    "/images/HomeCarousel/placeholder2.jpg",
    "/images/HomeCarousel/placeholder3.jpg",
  ];
  console.log(config?.bannerImages);

  return (
    <main>
      <Carousel images={bannerImages} />
      <About/>
      <News/>
      <Faq/>
      <Socials/>
    </main>
  );
}
