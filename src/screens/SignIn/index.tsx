import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

import { Container, Header, Title, SubTitle, Footer, Form } from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth()
  const navigation = useNavigation<any>();
  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail é obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().required('A senha é obrigatoria'),
      });

      await schema.validate({ email, password });
      await signIn({email, password});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa',error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao tentar sr autenticar, verifique suas credenciais'
        );
      }
    }
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              isLoading={false}
            />
            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              enabled={true}
              isLoading={false}
              color="#fff"
              isLight={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
