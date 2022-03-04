import { call, put, takeEvery } from "redux-saga/effects";
import {
  getReposSuccess,
  getRepoDetailsSuccess,
  getRepoActivitiesSuccess,
  getRepoCommitActivitiesSuccess,
  getRepoContributorActivitiesSuccess,
} from "./reposState";
import {
  fetchRepos,
  fetchRepoDetails,
  fetchRepoActivities,
  fetchRepoCommitActivities,
  fetchRepoContributorActivities,
} from "./reposApis";

function* workGetReposFetch(data) {
  const repos = yield call(() => fetchRepos(data.payload));
  yield put(getReposSuccess(repos));
}

function* workGetfetchRepoDetails(data) {
  const repo = yield call(() => fetchRepoDetails(data.payload));
  yield put(getRepoDetailsSuccess(repo));
}

function* workGetfetchRepoActivities(data) {
  const repo = yield call(() => fetchRepoActivities(data.payload));
  yield put(getRepoActivitiesSuccess(repo));
}

function* workGetRepoCommitActivities(data) {
  const repo = yield call(() => fetchRepoCommitActivities(data.payload));
  yield put(getRepoCommitActivitiesSuccess(repo));
}

function* workGetRepoContributorActivities(data) {
  const repo = yield call(() => fetchRepoContributorActivities(data.payload));
  yield put(getRepoContributorActivitiesSuccess(repo));
}

function* repoSaga() {
  yield takeEvery("repos/getReposFetch", workGetReposFetch);
  yield takeEvery("repos/getReposFilterFetch", workGetReposFetch);
  yield takeEvery("repos/getRepoDetails", workGetfetchRepoDetails);
  yield takeEvery("repos/getRepoActivities", workGetfetchRepoActivities);
  yield takeEvery("repos/getRepoCommitActivities", workGetRepoCommitActivities);
  yield takeEvery(
    "repos/getRepoContributorActivities",
    workGetRepoContributorActivities
  );
}

export default repoSaga;
