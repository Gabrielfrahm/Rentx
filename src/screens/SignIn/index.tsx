import React from 'react';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';

import { Container, Header, Title, SubTitle, Footer } from './styles';

export function SignIn() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <Title>Estamos{'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}uma experiência incrível.
        </SubTitle>
      </Header>
      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          isLoading={false}
        />
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          enabled={true}
          isLoading={false}
          color="#fff"
          isLight={true}
        />
      </Footer>
    </Container>
  );
}
