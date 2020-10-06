import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { human, systemWeights } from 'react-native-typography';

import { Container, Text } from './styles';
import { StackScreensParams } from '~/routes';
import client from '~/services/client';
import IDetailedMovieInfo from '~/interfaces/IDetailedMovieInfo';
import { ConfigContext } from '~/contexts/config';

type DetailRouteProp = RouteProp<StackScreensParams, 'Details'>;

const Detail: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const config = useContext(ConfigContext);
  const window = useWindowDimensions();
  const [details, setDetails] = useState<IDetailedMovieInfo | null>(null);
  const [backdropRatio, setBackdropRatio] = useState(0);

  const coverPath = useMemo(() => {
    return details
      ? `${
          config.values?.images.secure_base_url
        }w500/${details?.backdrop_path?.substring(1)}`
      : null;
  }, [config.values?.images.secure_base_url, details]);

  useEffect(() => {
    if (!coverPath) return;

    Image.getSize(coverPath, (height, width) => {
      setBackdropRatio(height / width);
    });
  }, [coverPath]);

  useEffect(() => {
    const load = async () => {
      const { data } = await client.get(`movie/${route.params.id}`);
      setDetails(data);
    };

    load();
  }, [route.params.id]);

  if (!details) return <Text>Loading...</Text>;

  return (
    <>
      {coverPath && backdropRatio ? (
        <Image
          source={{ uri: coverPath }}
          style={{
            width: window.width,
            aspectRatio: backdropRatio,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      ) : null}

      <Container>
        <Text style={[human.title1, systemWeights.bold]}>{details.title}</Text>
        <Text style={[human.footnote, systemWeights.semibold]}>
          Runtime: {details.runtime} minutes
        </Text>
        <Text style={human.footnote}>Status: {details.status}</Text>
        <Text style={human.footnote}>Release date: {details.release_date}</Text>

        <View style={{ height: 20 }} />

        <Text style={human.body}>{details.overview}</Text>

        <View style={{ height: 20 }} />

        <Text style={human.caption1}>
          Original Title: {details.original_title}
        </Text>
      </Container>
    </>
  );
};

export default Detail;
