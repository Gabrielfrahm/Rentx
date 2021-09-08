import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps{
  title: string;
  color?: string;
  isLoading?: boolean;
  isLight?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
  isLight = false,
}: Props) {
  const theme = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{ opacity: (enabled === false || isLoading === true) ? .5 : 1 }}
    >
      {isLoading ? <ActivityIndicator color={theme.colors.shape} />
        : <Title isLight={isLight}>{title}</Title>
      }
    </Container >
  );
}
