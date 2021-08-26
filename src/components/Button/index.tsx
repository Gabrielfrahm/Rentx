import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
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
        : <Title>{title}</Title>
      }
    </Container >
  );
}
