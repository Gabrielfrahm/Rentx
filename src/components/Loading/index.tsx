import React from 'react';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';
export function Loading(){
  const theme = useTheme();
  return (
    <ActivityIndicator
      color={theme.colors.main}
      size="large"
      style={{flex: 1}}
    />
  );
}
