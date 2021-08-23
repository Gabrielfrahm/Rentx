import React from 'react';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

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
  const theme = useTheme();
  const navigation = useNavigation();
  function handleConfirm(){
    // erro for typescript but, issus open in github
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={() => { }} />

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
        <Calendar />
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
