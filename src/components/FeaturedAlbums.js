import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const FeaturedAlbums = () => (
  <Container className="my-5">
    <h2 className="mb-4">Álbumes destacados</h2>
    <Row>
      {[1, 2, 3].map((id) => (
        <Col md={4} key={id}>
          <Card className="mb-4">
            <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=Álbum+${id}`} />
            <Card.Body>
              <Card.Title>Álbum {id}</Card.Title>
              <Card.Text>Artista destacado</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default FeaturedAlbums;
