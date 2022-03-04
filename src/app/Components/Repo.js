import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  getRepoActivities,
  getRepoCommitActivities,
  getRepoContributorActivities,
} from "../Containers/dashboard/reposState";

import Graph from "./Charts/Chart";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    margin: 5,
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: 128,
    height: 128,
  },
  link: {
    margin: theme.spacing.unit,
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      border: "none",
    },
  },
}));

const Repo = ({
  repoId,
  classes,
  avatar_url,
  name,
  html_url,
  owner,
  description,
  stargazers_count,
  open_issues_count,
  created_at,
  setOpenId,
  openId,
}) => {
  const [open, setOpen] = useState(false);
  const [seriesType, setSeriesType] = useState("");
  const repoFrequency = useSelector((state) => state.repos.repoFrequency);
  const repoCommitsActivities = useSelector(
    (state) => state.repos.repoCommitsActivities
  );

  const contributorActivities = useSelector(
    (state) => state.repos.contributorActivities
  );

  const dispatch = useDispatch();

  const handleDropdownChange = async (value) => {
    setOpen(false);
    setSeriesType(value);
    setOpenId();
    getContributorActivities();
    if (value === "additions" || value === "deletions") {
      await getAdditions();
    } else if (value === "commits") {
      await getCommitActivities();
    }
    setOpen(true);
  };
  const getAdditions = () => {
    dispatch(
      getRepoActivities({
        owner: owner,
        repo: name,
      })
    );
  };
  const getCommitActivities = () => {
    dispatch(
      getRepoCommitActivities({
        owner: owner,
        repo: name,
      })
    );
  };

  const getContributorActivities = () => {
    dispatch(
      getRepoContributorActivities({
        owner: owner,
        repo: name,
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "flex" },
            m: 1,
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          }}
        >
          <Box sx={{ marginRight: 2 }}>
            <ButtonBase className={classes.image}>
              <a
                href={` https://github.com/${owner} `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={classes.img}
                  alt="Owner Avatar"
                  src={` ${avatar_url} `}
                />
              </a>
            </ButtonBase>
          </Box>
          <Box sx={{ display: "block", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography gutterBottom variant="h4" style={{wordBreak:"break-all"}}>
                <Link
                  href={html_url}
                  color="inherit"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  className={classes.link}
                >
                  {name}
                </Link>
              </Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                sx={{
                  textOverflow: "ellipsis",
                  maxHeight: 50,
                  overflow: "hidden",
                }}
              >
                {description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="span"
                sx={{ p: 1, border: "1px solid grey", marginRight: 4 }}
              >
                <Button>{` Stars: ${stargazers_count} `}</Button>
              </Box>
              <Box
                component="span"
                sx={{ p: 1, border: "1px solid grey", marginRight: 4 }}
              >
                <Button>{` Issues: ${open_issues_count} `}</Button>
              </Box>
              <Box>
                <Typography color="primary">
                  Last published {moment(created_at).fromNow()} By {owner}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", sm: "flex", md: "block" },
              marginTop: { xs: "2", sm: "2", md: "none" },
            }}
          >
            <FormControl variant="standard">
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={seriesType}
                onChange={(e) => handleDropdownChange(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem value={"commits"}>Commits</MenuItem>
                <MenuItem value={"additions"}>Additions</MenuItem>
                <MenuItem value={"deletions"}>Deletions</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {open && openId === repoId ? (
          <Paper>
            {(seriesType === "additions" || seriesType === "deletions") &&
            repoFrequency &&
            repoFrequency.hasOwnProperty("addition") &&
            repoFrequency.hasOwnProperty("deletion") ? (
              <div
                style={{
                  maxWidth: "800px",
                  maxHeight: "400px",
                  margin: "auto",
                }}
              >
                <Graph
                  type="line"
                  titleText={"Total Changes"}
                  yAxisText="Number of changes"
                  xCategories={repoFrequency.xCategories || []}
                  series={[
                    (repoFrequency && repoFrequency.addition) || {},
                    (repoFrequency && repoFrequency.deletion) || {},
                  ]}
                  graphType="totalChanges"
                />
              </div>
            ) : null}
            {seriesType === "commits" &&
            repoCommitsActivities &&
            repoCommitsActivities.hasOwnProperty("commits") ? (
              <div
                style={{
                  maxWidth: "800px",
                  maxHeight: "400px",
                  margin: "auto",
                }}
              >
                <Graph
                  type="line"
                  titleText="Commits"
                  yAxisText="Number of commits"
                  xCategories={repoCommitsActivities.xCategories || []}
                  series={[repoCommitsActivities.commits]}
                  graphType="commits"
                />
              </div>
            ) : null}

            <div
              style={{ maxWidth: "800px", maxHeight: "400px", margin: "auto" }}
            >
              <Graph
                type=""
                titleText="Contributors Changes"
                yAxisText="Number of contribution"
                xCategories={
                  (contributorActivities &&
                    contributorActivities.xCategories) ||
                  []
                }
                series={
                  (contributorActivities && contributorActivities.graphData) ||
                  []
                }
                graphType="contributors"
              />
            </div>
          </Paper>
        ) : null}
      </Paper>
    </div>
  );
};

Repo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Repo);
