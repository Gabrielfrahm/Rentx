import styled from 'styled-components/native';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.title : theme.colors.shape};
  margin-left: 8px;
  border-radius: 3px;
`;
