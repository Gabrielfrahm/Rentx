import React, { useState } from 'react';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generationInterval, MarketDateProps } from '../../components/Calendar';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';

import { format } from 'date-fns/esm';
import { getPlatFormDate } from '../../utils/getPlatformDate';

import ArrowSVG from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DataInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}


export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [marketDate, setMarketDate] = useState<MarketDateProps>({} as MarketDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirm() {
    // erro for typescript but, issus open in github
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(marketDate),
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    // sempre data menor no start e data menor no end
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generationInterval(start, end);
    setMarketDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatFormDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatFormDate(new Date(endDate)), 'dd/MM/yyyy'),
    })

  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim de aluguel
        </Title>

        <RentalPeriod>
          <DataInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DataInfo>
          <ArrowSVG />
          <DataInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DataInfo>
        </RentalPeriod>

      </Header>
      <Content>
        <Calendar
          marketDates={marketDate}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirm}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>

    </Container>
  );
}
