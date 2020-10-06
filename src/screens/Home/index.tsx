import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  FlatList,
  Text,
  Image,
  ListRenderItemInfo,
  useWindowDimensions,
  View,
  StatusBar,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { human, systemWeights } from 'react-native-typography';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import { ConfigContext } from '~/contexts/config';
import IApiResponse from '~/interfaces/IApIResponse';
import IGenre from '~/interfaces/IGenre';
import IMovie from '~/interfaces/IMovie';
import client from '~/services/client';
import { Container, MovieCardContainer, MoviesSection } from './styles';

type GenresResponse = {
  genres: IGenre[];
};

interface IGenresList extends IGenre {
  movies: IMovie[];
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { values: config } = useContext(ConfigContext);
  const window = useWindowDimensions();
  const [trendingMovies, setTrendingMovies] = useState<IMovie[] | null>(null);
  const [genres, setGenres] = useState<IGenresList[] | null>(null);

  useEffect(() => {
    client.get<IApiResponse<IMovie>>('trending/movie/week').then((r) => {
      setTrendingMovies(r.data.results);
    });

    client
      .get<IApiResponse<IMovie>>('/discover/movie')
      .then((r) => r.data.results)
      .then((movies) => {
        client.get<GenresResponse>('genre/movie/list').then((r) => {
          setGenres(
            r.data.genres.map((genre) => ({
              ...genre,
              movies: movies.filter((movie) =>
                movie.genre_ids.some(
                  (movieGenreId) => movieGenreId === genre.id,
                ),
              ),
            })),
          );
        });
      });
  }, []);

  const renderCover = useCallback(
    ({ item }: ListRenderItemInfo<IMovie>) => {
      const posterPath = `${
        config?.images.secure_base_url
      }w500/${item.backdrop_path?.substring(1)}`; // .substring(1) removes the slash from backdrop_path

      return (
        <>
          <Image
            resizeMode="cover"
            style={{
              width: window.width,
              aspectRatio: 1.75,
            }}
            source={{
              uri: posterPath,
            }}
          />
          <View
            style={{
              marginTop: -scale(40),
              height: verticalScale(40),
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              padding: 10,
            }}
          >
            <Text
              style={[human.calloutWhite, systemWeights.bold]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
        </>
      );
    },
    [config, window.width],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IMovie>) => {
      const posterPath = `${
        config?.images.base_url
      }w500/${item.poster_path?.substring(1)}`;

      return (
        <MovieCardContainer
          onPress={() => navigation.navigate('Details', { id: item.id })}
        >
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
    [config, navigation],
  );

  if (!trendingMovies) return <Text>Loading...</Text>;

  const titleStyle = [human.title2, systemWeights.bold, { padding: scale(10) }];

  return (
    <Container>
      <StatusBar hidden />
      <Carousel
        data={trendingMovies}
        renderItem={renderCover}
        itemWidth={window.width}
        sliderWidth={window.width}
        activeAnimationType="timing"
        autoplayInterval={5000}
        enableSnap
        autoplay
        loop
      />

      {genres?.map(
        (genre) =>
          genre.movies.length > 0 && (
            <MoviesSection key={String(genre.id)}>
              <Text style={titleStyle}>{genre.name}</Text>
              <FlatList
                horizontal
                data={genre.movies}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
              />
            </MoviesSection>
          ),
      )}
    </Container>
  );
};

export default Home;
