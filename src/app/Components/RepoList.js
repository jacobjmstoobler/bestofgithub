import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Skeleton from "@mui/material/Skeleton";


import InfiniteScroll from "react-infinite-scroll-component";

import Repo from "./Repo";

export default function RepoList({ repoData, fetchMore }) {

  const [openId, setOpenId] = useState('')

  // let navigate = useNavigate();

  const { items: repos = [] } = repoData;
  const fetchData = () => {
    fetchMore();
  };
  // const redirectToDetails = (repo) => {
  //   navigate(`/${repo.owner.login}/${repo.name}`);
  // };
  return (
    <InfiniteScroll
      dataLength={repoData && repoData.total_count}
      next={fetchData}
      hasMore={true}
      scrollableTarget="scrollableDiv"
    >
      <div id="scrollableDiv" style={{"maxHeight":"500px","overflow":"auto", }}>
        {repos && repos.length
          ? repos.map((repo, index) => (
              <Repo
                key={repo.id}
                repoId={repo.id}
                avatar_url={repo.owner.avatar_url}
                owner={repo.owner.login}
                name={repo.name}
                html_url={repo.html_url}
                description={repo.description}
                stargazers_count={repo.stargazers_count}
                open_issues_count={repo.open_issues_count}
                created_at={repo.created_at}
                setOpenId={()=>setOpenId(repo.id)}
                openId={openId}
              />
            ))
          : <Loader/>}
      </div>
    </InfiniteScroll>
  );
}

const Loader = () => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <ListItem key={i}>
        <ListItemAvatar style={{marginRight:3}}>
          <Skeleton variant="rectangular" width={125} height={128} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton ariant="rectangular" width="100%" height={150} />
        </ListItemText>
      </ListItem>
    ))}
  </>
);
