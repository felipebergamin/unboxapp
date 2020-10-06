import React, { useCallback, useState, useRef, useContext } from 'react';
import { Alert, FlatList, ListRenderItemInfo, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Axios, { CancelTokenSource } from 'axios';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import client from '~/services/client';
import { Container, MovieCardContainer } from './styles';
import IMovie from '~/interfaces/IMovie';
import { ConfigContext } from '~/contexts/config';

const Search: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<IMovie[] | null>(null);
  const cancelToken = useRef<CancelTokenSource>();
  const config = useContext(ConfigContext);
  const navigation = useNavigation();

  const performSearch = useCallback(async () => {
    if (cancelToken.current) cancelToken.current.cancel();

    cancelToken.current = Axios.CancelToken.source();

    try {
      const { data } = await client.get('search/movie', {
        params: {
          query: search,
        },
        cancelToken: cancelToken.current.token,
      });

      setSearchResult(data.results);
    } catch (err) {
      if (!Axios.isCancel(err)) {
        Alert.alert('Sorry, there was an error, please, try again');
      }
    }
  }, [search]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IMovie>) => {
      const posterPath = `${
        config.values?.images.base_url
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

  return (
    <Container>
      <Searchbar
        placeholder="Search by movie title"
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
        onSubmitEditing={performSearch}
      />

      {searchResult && searchResult.length > 0 ? (
        <FlatList
          numColumns={2}
          data={searchResult}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      ) : null}
    </Container>
  );
};

export default Search;
