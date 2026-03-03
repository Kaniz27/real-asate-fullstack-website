import Hero from "./components/Hero";
import QuickSearch from "./components/QuickSearch";

import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSlider from "./components/TestimonialsSlider";
import Homelayout from "./layout/Homelayout"

export default function HomePage() {
  return (
    <>
      <Homelayout>
        <Hero />
        <QuickSearch />
        <WhyChooseUs />
        <TestimonialsSlider />
      </Homelayout>
    </>
  );
}