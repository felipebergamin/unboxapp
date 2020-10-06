export default interface IApiResponse<T = any> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
