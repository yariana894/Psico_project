import Descripcion from "../Home/Descripcion";
import Encabezado from "../Home/Encabezado";
import "../../styles/Home.css";

const Home = () => {
  return (
    <main className="home">
      <Encabezado />
      <Descripcion />
    </main>
  );
};

export default Home;
