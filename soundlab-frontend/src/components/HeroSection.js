import React from 'react';
import { Container, Button } from 'react-bootstrap';

const HeroSection = () => (
  <div className="bg-light text-center py-5">
    <Container>
      <h1>Bienvenido a SoundLab</h1>
      <p>Descubrí y comprá tu música favorita en segundos.</p>
      <Button variant="primary">Explorar ahora</Button>
    </Container>
  </div>
);

export default HeroSection;
