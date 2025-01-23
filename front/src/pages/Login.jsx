import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Header from '../componentes/Header';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isLoggedIn,setIsLoggedIn, login } = useContext(UserContext);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClose = () => {
    setShow(false) 
    setIsLoggedIn(true);
    if (isLoggedIn) {
      setRedirect(true)
    }
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity()) {
      const success = await login(correo, password);
      console.log('success Login', success);
      if (success) {
        handleShow(); 
     
      }
    }
    setValidated(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='container w-50 text-white'>
        <Header titulo="Mamma Mia" descripcion="Tenemos las mejores pizzas que podrás encontrar" />
        <h4 className="text-center text-white">Login</h4>
        <Row className="mb-3">
          <Form.Group controlId="validationCustomUsername" className='my-3'>
            <Form.Label>Correo electrónico</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(e) => setCorreo(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa el correo.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formGroupPassword" className='my-2'>
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa la contraseña.
              </Form.Control.Feedback>
            </InputGroup>
            <span>{password.length < 6 ? 'Debe ingresar mínimo 6 dígitos' : ''}</span>
          </Form.Group>
        </Row>
        <Button type="submit" className='bg-warning'>Ingresar</Button>

        <Modal show={show} onHide={handleClose} className='bg-dark'>
          <Modal.Header closeButton>
            <Modal.Title>Logeo exitoso!</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <Image src="https://media.istockphoto.com/id/1485017862/es/vector/chef-italiano-presentando-pizza-logo.jpg?s=612x612&w=0&k=20&c=eL38NRfvuPTvJlhJ2Z5j_WA0-eo40rFF19Zq5UiK3yY=" roundedCircle className='w-75'/>
            <p>Felicidades, ingreso exitoso!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

export default Login;
