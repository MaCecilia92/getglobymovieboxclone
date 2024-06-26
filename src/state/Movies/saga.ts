/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as actions from './reducer';
import { getMovieSearchService } from '../../service';
import { Movie } from '../../service';
import { MovieSearchState } from './initialState';

export interface SearchResponses extends MovieSearchState {
  searchResults: Movie[];
  totalResults: string;
  isLoading: boolean;
  error: string | boolean;
}

export interface SearchResponse extends SearchResponses {
  Search?: Movie[];
  Response?: string;
  MovieById?: object | [];
}

function* searchMovies({
  payload,
}: PayloadAction<string>): Generator<any, void, SearchResponse> {
  try {
    const searchResponse: SearchResponses = yield call(
      getMovieSearchService,
      payload,
    );
    yield put(actions.setDataSucceeded(searchResponse));
  } catch (error: any) {
    yield put(actions.setDataError(error.message));
    console.error('Error searching movies:', error);
  }
}

function* searchMovieById({
  payload,
}: PayloadAction<string>): Generator<any, void, SearchResponse> {
  try {
    const movieById: SearchResponses = yield call(
      getMovieSearchService,
      payload,
    );
    yield put(actions.setDataByIdSuceeded(movieById));
  } catch (error: any) {
    yield put(actions.setDataError(error.message));
    console.error('Error searching movie:', error);
  }
}

export default [
  takeLatest(actions.setDataRequest.type, searchMovies),
  takeLatest(actions.setDataByIdRequest.type, searchMovieById),
];
