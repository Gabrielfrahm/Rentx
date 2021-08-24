import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


import Logo from '../../assets/logo.svg';
import { api } from '../../service/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';

import { Loading } from '../../components/Loading';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car : CarDTO) {
    // erro for typescript but, issus open in github
    navigation.navigate('CarDetails', {car});
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        await api.get('/cars').then(
          response => setCars(response.data)
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [])

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
      {
        isLoading ? <Loading /> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }
    </Container>
  );
}
