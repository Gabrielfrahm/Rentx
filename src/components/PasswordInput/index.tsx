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
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleShowPassword() {
    setIsVisible((preState) => !preState);
  }
  return (
    <Container  >
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isVisible}
        isFocused={isFocused}
        {...rest}
      />
      <IconContainer isFocused={isFocused} >
        <ChangePasswordVisibilityButton onPress={handleShowPassword}>
          <Feather
            name={isVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </ChangePasswordVisibilityButton>
      </IconContainer>
    </Container>
  );
}
