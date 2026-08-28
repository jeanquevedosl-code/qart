import Nav from "./Nav";
import Hero from "./Hero";
import Works from "./Works";
import { About, Services, Stats, Testimonials, Ticker } from "./Sections";
import Contact from "./Contact";
import { Cursor } from "./ui";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-ink text-chalk">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Works />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <Ticker tone="butter" reverse />
        <Contact />
      </main>
    </div>
  );
}
