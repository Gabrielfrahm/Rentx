import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface dataProps {
  brand: string;
  name:string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface carProps extends RectButtonProps {
  data: dataProps;
}

export function Car({data, ...rest}: carProps){
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>
      <CarImage resizeMode="contain" source={{uri: data.thumbnail}} />
    </Container>
  );
}
