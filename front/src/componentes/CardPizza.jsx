import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
function CardPizza({ id, img, name, ingredientes, price }) {
  const { addToCart } = useContext(CartContext);
  const pizza = { name, ingredientes, price, img, id };

  return (
    <Card border="warning" className="text-center m-3">
      <Card.Img variant="top" src={img} className="img-fluid" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <hr />
        <Card.Text>Ingredientes: {ingredientes}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          <ListGroup>
            <ListGroup.Item key="index">
              <Spinner animation="grow" role="status" variant="light">
                <span>🍕</span>
              </Spinner>{" "}
              {ingredientes}
            </ListGroup.Item>
          </ListGroup>
        </Card.Subtitle>
      </Card.Body>
      <hr />
      <Card.Title>
        Precio: $ <span>{price.toLocaleString()}</span>
      </Card.Title>
      <Card.Body className="flex">
        <Link to={`/pizza/${id}`} className=" col md-col-4">
          {" "}
          <Button variant="secondary">Ver más 👀</Button>
        </Link>
        <Card.Link href="#">
          {" "}
          <Button variant="dark" onClick={() => addToCart(pizza)}>
            Añadir 🛒
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
CardPizza.protoType = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredientes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardPizza;
