import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
function Pizza() {
  const [dataPizza, setDataPizza] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("id en  pizza", id);
  const urlPizza = `http://localhost:5000/api/pizzas/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlPizza);
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setDataPizza(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [urlPizza, id]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container text-center">
      <Card
        border="warning"
        className="text-center m-3"
        style={{ width: "25rem" }}
      >
        <Card.Img
          variant="top"
          src={dataPizza.img}
          className="img-fluid"
          alt={dataPizza.name}
        />
        <Card.Body>
          <Card.Title>{dataPizza.name}</Card.Title>
          <hr />
          <Card.Subtitle className="mb-2 text-muted">
            {dataPizza.desc}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <Card.Text>Ingredientes:</Card.Text>
            <ListGroup>
              <ListGroup.Item key="index">
                <Spinner animation="grow" role="status" variant="light">
                  <span>🍕</span>
                </Spinner>{" "}
                {dataPizza.ingredients.join(" , ")}
              </ListGroup.Item>
            </ListGroup>
          </Card.Subtitle>
        </Card.Body>
        <hr />
        <Card.Title>
          Precio: $<span>{dataPizza.price}</span>
        </Card.Title>
        <Card.Body className="d-flex justify-content-around">
          <Button variant="dark" href="#">
            Añadir{" "}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Pizza;
