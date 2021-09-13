import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';
import LogoSVG from '../../assets/logo_background_gray.svg';
import DoneSVG from '../../assets/done.svg';

import { Container, Contente, Title, Message, Footer } from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;
  function handleOk() {
    // erro for typescript but, issus open in github
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSVG width={width} />
      <Contente>
        <DoneSVG width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Contente>
      <Footer>
        <ConfirmButton title="ok" onPress={handleOk} />
      </Footer>
    </Container>
  );
}
