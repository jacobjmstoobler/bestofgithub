import React, { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getReposFetch, getReposFilterFetch } from "./reposState";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import RepoList from "../../Components/RepoList";

const pageLimt = 30;

export default function Dashboard() {
  const repos = useSelector((state) => state.repos.repos);

  const setStateReducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(setStateReducer, {
    page: 1,
    filter: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    let query = `page=${state.page}&per_page=${pageLimt}&sort=stars&order=desc`;

    dispatch(
      getReposFetch({
        query: query,
      })
    );
    return () => {};
  }, [state.page, dispatch]);
  const fetchMore = () => {
    setState({
      page: state.page + 1,
    });
  };
  const filterData = (value) => {
    setState({
      page: 1,
      filter: value,
    });
    let filter = "";
    const filterDateFilter = "YYYY-MM-DD";
    switch (value) {
      case "week":
        filter = moment().subtract(1, "weeks").format(filterDateFilter);
        break;
      case "two_weeks":
        filter = moment().subtract(2, "weeks").format(filterDateFilter);
        break;
      case "month":
        filter = moment().subtract(1, "month").format(filterDateFilter);
        break;

      default:
        break;
    }
    let query = `created:>${filter}&page=${state.page}&per_page=${pageLimt}&sort=stars&order=desc`;
    dispatch(
      getReposFilterFetch({
        query: query,
      })
    );
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          onChange={(e) => filterData(e.target.value)}
          label="Filter"
          value={state.filter}
        >
          <MenuItem value={"week"}>last 1 Week</MenuItem>
          <MenuItem value={"two_weeks"}>last 2 Weeks</MenuItem>
          <MenuItem value={"month"}>last 1 Month</MenuItem>
        </Select>
      </FormControl>

      <RepoList repoData={repos} fetchMore={fetchMore} />
    </div>
  );
}
