import { api, catchHandler } from "../../helpers/axios";
import config from "../../../config";

export function fetchRepos(payload) {
  return api()
    .get(`${config.routes.searchRepos}?q=${payload.query}`)
    .then((res) => res.data)
    .catch(catchHandler);
}
export function fetchRepoDetails(payload) {
  return api()
    .get(`${config.routes.repo}/${payload.owner}/${payload.repo}`)
    .then((res) => res.data)
    .catch(catchHandler);
}

export function fetchRepoActivities(payload) {
  return api()
    .get(
      `${config.routes.repo}/${payload.owner}/${payload.repo}${config.routes.frequency}`
    )
    .then((res) => res.data)
    .catch(catchHandler);
}
export function fetchRepoCommitActivities(payload) {
  return api()
    .get(
      `${config.routes.repo}/${payload.owner}/${payload.repo}${config.routes.commitActivity}`
    )
    .then((res) => res.data)
    .catch(catchHandler);
}
export function fetchRepoContributorActivities(payload) {
  return api()
    .get(
      `${config.routes.repo}/${payload.owner}/${payload.repo}${config.routes.contributorActivity}`
    )
    .then((res) => res.data)
    .catch(catchHandler);
}
