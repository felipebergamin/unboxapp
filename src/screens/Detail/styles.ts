import styled from 'styled-components/native';
import { Text as AnimatableText } from 'react-native-animatable';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Text = styled(AnimatableText).attrs({
  animation: 'fadeInUp',
})``;
