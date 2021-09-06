import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSVG from '../../assets/logo_background_gray.svg';
import DoneSVG from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Contente,
  Title,
  Message,
  Footer,
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation<any>();
  function handleOk(){
    // erro for typescript but, issus open in github
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSVG
        width={width}
      />
      <Contente>
        <DoneSVG width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {`\n`}
          até a concessionária da RENTX {`\n`}
          pegar o seu automóvel.
        </Message>
      </Contente>
      <Footer>
        <ConfirmButton title="ok" onPress={handleOk} />
      </Footer>
    </Container>
  );
}
