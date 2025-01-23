import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, decreaseQuantity } = useContext(CartContext);

  return (
    <ListGroup.Item
      className="d-flex align-items-center justify-content-between"
      style={{ padding: "10px" }}
    >
      <div className="d-flex align-items-center">
        <img
          src={item.img}
          alt={item.name}
          style={{ width: "80px", height: "80px", marginRight: "15px" }}
        />
        <div>
          <h6>Pizza {item.name}</h6>
          <p>Precio: ${item.price}</p>
          <p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => addToCart(item)}
              style={{ marginRight: "10px" }}
            >
              +
            </Button>
            {item.count > 0 && (
              <>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </Button>
                <span style={{ marginLeft: "10px" }}>
                  Cantidad: {item.count}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
      <div>
        <p>Total: ${item.price * item.count}</p>
      </div>
    </ListGroup.Item>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
