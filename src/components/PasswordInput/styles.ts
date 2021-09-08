import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)``;
