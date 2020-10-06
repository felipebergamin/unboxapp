import React, { useEffect, useState, useContext, useCallback } from 'react';
import { FlatList, Text, Image, ListRenderItemInfo, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { human, systemWeights } from 'react-native-typography';

import { ConfigContext } from '~/contexts/config';
import IApiResponse from '~/interfaces/IApIResponse';
import IMovie from '~/interfaces/IMovie';
import client from '~/services/client';
import { Container, MovieCardContainer, MoviesSection } from './styles';

const Home: React.FC = () => {
  const { values: config } = useContext(ConfigContext);
  const [trendingMovies, setTrendingMovies] = useState<IMovie[] | null>(null);
  const [discoverMovies, setDiscoverMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    client.get<IApiResponse<IMovie>>('trending/movie/week').then((r) => {
      setTrendingMovies(r.data.results);
    });

    client.get<IApiResponse<IMovie>>('/discover/movie').then((r) => {
      setDiscoverMovies(r.data.results);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IMovie>) => {
      const posterPath = `${
        config?.images.base_url
      }w500/${item.poster_path?.substring(1)}`;

      return (
        <MovieCardContainer>
          {item.poster_path && (
            <Image
              resizeMode="contain"
              style={{
                width: scale(140),
                aspectRatio: 0.65,
              }}
              source={{
                uri: posterPath,
              }}
            />
          )}
        </MovieCardContainer>
      );
    },
    [config],
  );

  if (!trendingMovies) return <Text>Loading...</Text>;

  const titleStyle = [human.title2, systemWeights.bold, { padding: scale(10) }];

  return (
    <Container>
      <MoviesSection>
        <Text style={titleStyle}>Trending movies</Text>
        <FlatList
          horizontal
          data={trendingMovies}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ width: scale(14) }} />}
          showsHorizontalScrollIndicator={false}
        />
      </MoviesSection>

      <MoviesSection>
        <Text style={titleStyle}>Discover movies</Text>
        <FlatList
          horizontal
          data={discoverMovies}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ width: scale(14) }} />}
          showsHorizontalScrollIndicator={false}
        />
      </MoviesSection>
    </Container>
  );
};

export default Home;
