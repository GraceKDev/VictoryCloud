import Nav from "./components/global/Navigation";
import About from "./components/home/About";
import Carousel from "./components/home/Carousel";
import News from "./components/home/News";
import Socials from "./components/home/Socials";

export default function Home() {
  return (
    <main>
      <Carousel images={["/images/HomeCarousel/placeholder1.jpg", "/images/HomeCarousel/placeholder2.jpg", "/images/HomeCarousel/placeholder3.jpg"]} />
      <About/>
      <News/>
      <Socials/>
    </main>
  );
}
