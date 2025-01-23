import Grilla from "../componentes/Grilla";
import Header from "../componentes/Header";

const Home = () => {
  return (
    <>
      <Header
        titulo="Mamma Mia"
        descripcion="Tenemos las mejores pizzas, solo pidelas y las tendrás !"
      />
      <Grilla />
    </>
  );
};
export default Home;
