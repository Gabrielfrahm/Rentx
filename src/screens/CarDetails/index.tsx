import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages
} from './styles';

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => { }}
        />
      </Header>
      <CarImages>
        <ImageSlider
          ImageUrl={['https://cdn.picpng.com/audi/audi-face-28582.png']}
        />
      </CarImages>
    </Container>
  );
}
