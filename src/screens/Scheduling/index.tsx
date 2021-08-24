import React, { useState } from 'react';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generationInterval, MarketDateProps } from '../../components/Calendar';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

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



export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [marketDate, setMarketDate] = useState<MarketDateProps>({} as MarketDateProps);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm() {
    // erro for typescript but, issus open in github
    navigation.navigate('SchedulingDetails');
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
            <DateValue selected={false}></DateValue>
          </DataInfo>
          <ArrowSVG />
          <DataInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={false}></DateValue>
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
        />
      </Footer>

    </Container>
  );
}
