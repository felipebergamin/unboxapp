import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const MovieCardContainer = styled.View`
  flex-direction: column;
  background-color: #ddd;
  margin: 0 ${scale(10)}px;
`;

export const MoviesSection = styled.View`
  margin-top: 20px;
`;
