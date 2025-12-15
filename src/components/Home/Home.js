import Encabezado from "../Home/Encabezado";
import Descripcion from "../Home/Descripcion";
import Features from "../Home/Features";
import InfoInteractiva from "../Home/InfoInteractiva";
import CTASection from "../Home/CTASection";

import "../../styles/Home.css";

const Home = () => {
  return (
    <main className="home">
      <Encabezado />
      <Descripcion />
      <Features />
      <InfoInteractiva />
      <CTASection />
    </main>
  );
};

export default Home;
