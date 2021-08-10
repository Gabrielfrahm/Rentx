import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';

export function Home() {
  const carData  = {
    brand : "audi",
    name : 'RS 5 Coupé',
    rent : {
      period: 'ao dia ',
      price: 25,
    },
    thumbnail : 'https://cdn.picpng.com/audi/audi-face-28582.png',
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1,2,3]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => <Car data={carData} /> }
      />
    </Container>
  );
}
