import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { StyleSheet } from 'react-native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

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
  CarList,
  MyCarsButton
} from './styles';
import { BackHandler } from 'react-native';
import { LoadingAnimation } from '../../components/LoadingAnimation';



export function Home() {


  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionY.value },
        { translateX: positionX.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleCarDetails(car: CarDTO) {
    // erro for typescript but, issus open in github
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    // erro for typescript but, issus open in github
    navigation.navigate('MyCars');
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
  }, []);

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
          {
            !isLoading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        isLoading ? <LoadingAnimation /> :
          <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, { backgroundColor: theme.colors.main }]}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
