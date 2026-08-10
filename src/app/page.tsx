import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import Faq from "./components/home/Faq";
import News from "./components/home/News";
import Socials from "./components/home/Socials";

type HomeConfig = {
  bannerImages?: string[] | null;
};

export async function getHomeConfig(): Promise<HomeConfig | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Config/GetConfig`, { cache: "no-store" });
    if (!res.ok) return null;
    const value = await res.json();
    return value.home as HomeConfig;
  } catch {
    return null;
  }
}

export function getBannerImages(config: HomeConfig | null) {
  if (config?.bannerImages) {
    return config.bannerImages.filter((image) => Boolean(image));
  }

  return [
    "/images/HomeCarousel/placeholder1.jpg",
    "/images/HomeCarousel/placeholder2.jpg",
    "/images/HomeCarousel/placeholder3.jpg",
  ];
}

export default async function Home() {
  const config = await getHomeConfig();
  const bannerImages = getBannerImages(config);


  return (
    <main>
      <Carousel images={bannerImages} />
      <About />
      <News />
      <Faq />
      <Socials />
    </main>
  );
}
