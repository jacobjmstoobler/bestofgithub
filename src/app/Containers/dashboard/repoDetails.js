import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";

import { getRepoDetails, getRepoActivities } from "./reposState";

import FrequencyGraph from "../../Components/Charts/Chart"

export default function RepoDetails() {
  const params = useParams();
  const repoDetails = useSelector((state) => state.repos.repoDetails);
  const repoFrequency = useSelector((state) => state.repos.repoFrequency);

  const dispatch = useDispatch();
  const { owner, repo } = params;
  const initializePage=async()=>{
    await Promise.all([
      new Promise(async (resolve, reject) => {
        dispatch(
          getRepoDetails({
            owner: owner,
            repo: repo,
          })
        );
        resolve(true)
      }),
      new Promise(async (resolve, reject) => {
        dispatch(
          getRepoActivities({
            owner: owner,
            repo: repo,
          })
        );
        resolve(true)
      })
    ])
  }
  useEffect(() => {
    initializePage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, repo]);

  return (
    <Container>
      <Paper elevation={0}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase>
              <a
                href={` https://github.com/${
                  repoDetails && repoDetails.owner.login
                } `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="Owner Avatar"
                  src={` ${repoDetails && repoDetails.owner.avatar_url} `}
                />
              </a>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={24}>
              <Grid item xs>
                <Typography gutterBottom variant="h3">
                  <Link
                    href={repoDetails && repoDetails.html_url}
                    color="inherit"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {repoDetails && repoDetails.name}
                  </Link>
                </Typography>
                <Typography gutterBottom variant="headline">
                  {repoDetails && repoDetails.description}
                </Typography>
                <Chip
                  label={` Stars: ${
                    repoDetails && repoDetails.stargazers_count
                  } `}
                  href="#chip"
                  clickable
                  variant="outlined"
                />
                <Chip
                  label={` Issues: ${
                    repoDetails && repoDetails.open_issues_count
                  } `}
                  clickable
                  variant="outlined"
                />
                <Typography color="primary" inline>
                  Submitted {moment(repoDetails && repoDetails.created_at).fromNow()} By{" "}
                  {repoDetails && repoDetails.owner.login}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        {repoFrequency && repoFrequency.hasOwnProperty("addition") && repoFrequency.hasOwnProperty("deletion") ?
          <FrequencyGraph
             type="line"
             titleText="Additions and Deletions"
             xCategories={repoFrequency.xCategories}
             series = {[
                repoFrequency && repoFrequency.addition,
                repoFrequency && repoFrequency.deletion
             ]}
          /> :null}  
      </Paper>
    </Container>
  );
}
