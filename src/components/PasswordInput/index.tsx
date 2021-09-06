import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, ...rest }: InputProps) {
  const [ isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  function handleShowPassword(){
    setIsVisible(preState => !preState)
  }
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isVisible} />
      <IconContainer>
        <ChangePasswordVisibilityButton onPress={handleShowPassword}>
          <Feather name={isVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
        </ChangePasswordVisibilityButton>
      </IconContainer>
    </Container>
  );
}
