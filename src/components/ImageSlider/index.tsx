import React, { useRef, useState } from 'react';

import { FlatList, ViewToken } from 'react-native';

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

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ ImageUrl }: ImageProp) {
  const [imageIndex, setImageIndex] = useState(0)


  const  indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  })

  return (
    <Container>
      <ImageIndexes>
        {
          ImageUrl.map((_,index) => (
            <ImageIndex key={String(index)} active={ index === imageIndex ? true: false } />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={ImageUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CarImageWrapper>

        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
