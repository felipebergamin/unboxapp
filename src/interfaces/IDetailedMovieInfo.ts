import IGenre from './IGenre';
import IMovie from './IMovie';

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export default interface IDetailedMovieInfo extends IMovie {
  belongs_to_collection: any;
  budget: number;
  genres: IGenre[];
  homepage: string | null;
  imdb_id: string | null;
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: any[];
  status: string;
  tagline: string | null;
}
