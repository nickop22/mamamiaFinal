import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const Cart = () => {
  const { cart, totalPrice, decreaseQuantity, addToCart, cartCheckout,checkoutSuccess } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClose = () => {
    setShow(false) 
    if (isLoggedIn) {
      setRedirect(true)
    }
  };
  const handleShow = () => setShow(true);

  const buyCart = async() => {
    await cartCheckout();
    if (checkoutSuccess) {
      handleShow()    
     }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <ListGroup>
        {cart.map(item => (
          <ListGroup.Item
            className="d-flex align-items-center justify-content-between"
            style={{ padding: '10px' }}
             key={item.id}
            >
            <div className="d-flex align-items-center">
              <img
                src={item.img}
                alt={item.name}
                style={{ width: '80px', height: '80px', marginRight: '15px' }}
              />
              <div>
                <h6>Pizza {item.name}</h6>
                <p>Precio: ${item.price}</p>
                <p>
                  {item.count > 0 && (
                    <>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span style={{ marginLeft: '10px' }}>Cantidad: {item.count}{ (' ') } </span>
                    </>
                  )}
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => addToCart(item)}
                    style={{ marginRight: '10px' }}
                  >
                    +
                  </Button>
                </p>
              </div>
            </div>
            <div>
              <p >Total: ${item.price * item.count}</p>
            </div>
        </ListGroup.Item>
            ))}
      </ListGroup>
      <h3 className='text-white py-3 bg-dark px-3 text-end'>Total Precio: ${totalPrice}</h3>
        <Button
        variant={`${isLoggedIn ? 'success' : 'secondary'}`}
     
        onClick={buyCart}
        style={{ marginRight: '10px' }}
        className={`${isLoggedIn ? 'inline w-full' : 'disabled'}`}
                  >
                  Pagar
      </Button>
      <Modal show={show} onHide={handleClose} className='bg-dark'>
          <Modal.Header closeButton>
            <Modal.Title>Pago exitoso!</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <Image src="https://media.istockphoto.com/id/1485017862/es/vector/chef-italiano-presentando-pizza-logo.jpg?s=612x612&w=0&k=20&c=eL38NRfvuPTvJlhJ2Z5j_WA0-eo40rFF19Zq5UiK3yY=" roundedCircle className='w-75'/>
            <p>Felicidades, Pago exitoso, disfruta de tus deliciosas pizzas! </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Cart;
