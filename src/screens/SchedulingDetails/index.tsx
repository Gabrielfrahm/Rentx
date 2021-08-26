import React, { useState, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';
import { getPlatFormDate } from '../../utils/getPlatformDate';
import { api } from '../../service/api';
import { Alert } from 'react-native';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';


interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const navigation = useNavigation();
  const rentalTotal = Number(dates.length * car.rent.price);



  async function handleConfirm() {

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const verifyDate = await schedulesByCar.data.unavailable_dates.filter((item: string) => {
      return dates.includes(item);
    });

    if (verifyDate.length === 0) {
      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ]

      await api.post('schedules_byuser', {
        user_id: 1,
        car
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
        // erro for typescript but, issus open in github
      })
        .then(response => navigation.navigate('SchedulingComplete'))
        .catch(_ => {
          Alert.alert('Não foi possível realizar o agendamento!')
        })
    } else {
      const day = await verifyDate.map((item: string) => {
        return `${format(getPlatFormDate(new Date(item)), 'dd/MM/yyyy')}`
      })
      return Alert.alert('agendamento nao foi possível na data',`${day}`);
    }

  }

    function handleGoBack() {
      navigation.goBack();
    }

    useEffect(() => {
      setRentalPeriod({
        start: format(getPlatFormDate(new Date(dates[0])), 'dd/MM/yyyy'),
        end: format(getPlatFormDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      })
    }, [])

    return (
      <Container>
        <Header>
          <BackButton
            onPress={handleGoBack}
          />
        </Header>
        <CarImages>
          <ImageSlider
            ImageUrl={car.photos}
          />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
              ))
            }

          </Accessories>

          <RentalPeriod>
            <CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>De</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>Ate</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>

          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>Total</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ {car.rent.price} x {dates.length} diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>

        <Footer>
          <Button
            title="Alugar agora"
            color={theme.colors.success}
            onPress={handleConfirm}
          />
        </Footer>

      </Container>
    );
  }
