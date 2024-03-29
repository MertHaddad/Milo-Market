import { store } from "../app/store";
import PropTypes from 'prop-types';

export const buildURL = (baseURL, noPagination) => {
  const allQueries = store.getState().query.value;
  let queries;
  if (noPagination) {
    let paginationQuery = allQueries.find((x) => /_page=/.test(x));
    queries = allQueries.filter((query) => query !== paginationQuery);
  } else queries = allQueries;
  let url = baseURL + "?";
  if (queries.length) {
    const queryParams = queries.map(query => `${query}`);
    url += queryParams.join('&');
    return url;
  } else return url;
};

buildURL.propTypes={
  baseURL:PropTypes.string,
  noPagination:PropTypes.bool
}