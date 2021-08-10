import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface ImageProp {
  ImageUrl: string[];
}

export function ImageSlider({ImageUrl} : ImageProp){
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={false} />
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>
      <CarImageWrapper>
        <CarImage
          source={{uri: ImageUrl[0]}}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </Container>
  );
}
