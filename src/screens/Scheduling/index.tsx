import React from 'react';
import { BackButton } from '../../components/BackButton';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

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
import { Button } from '../../components/Button';

export function Scheduling() {
  const theme = useTheme();
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

      </Content>
      <Footer>
        <Button
          title="Confirmar"
        />
      </Footer>

    </Container>
  );
}
