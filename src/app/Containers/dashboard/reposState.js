import { createSlice } from "@reduxjs/toolkit";
import moment from "moment"

export const reposSlice = createSlice({
  name: "repos",
  initialState: {
    repos: {
      items: [],
      total_count: 0,
    },
    isLoading: false,
    repoFrequency: {},
    repoCommitsActivities:{},
    contributorActivities:{}
  },
  reducers: {
    getReposFetch: (state) => {
      state.isLoading = true;
    },
    getReposFilterFetch: (state) => {
      state.isLoading = true;
      state.repos = {
        items: [],
        total_count: 0,
      };
    },
    getReposSuccess: (state, action) => {
      state.repos = {
        incomplete_results: action.payload.incomplete_results,
        items: [...state.repos.items, ...action.payload.items],
        total_count: action.payload.total_count,
      };
      state.isLoading = false;
    },
    getReposFailure: (state) => {
      state.isLoading = false;
    },
    getRepoDetails: (state) => {
      state.isLoading = true;
    },
    getRepoDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.repoDetails = action.payload;
    },
    getRepoActivities: (state) => {
      state.isLoading = false;
      state.repoFrequency = null;
    },
    getRepoActivitiesSuccess: (state, action) => {
        let data = action.payload;
        let repoFrequency = {}
        if(data.length){
            repoFrequency = {
                addition : {
                    name: "Addition",
                    data :[data[0][1],data[1][1]],
                    color:"green"
                },
                deletion : {
                    name: "Deletion",
                    data : [data[0][2],data[1][2]],
                    color:"red"
                },
                xCategories:[
                    moment.unix(data[0][0]).format("MM/DD/YY"),
                    moment.unix(data[1][0]).format("MM/DD/YY"),
                    
                ]
            }
        }
      state.isLoading = false;
      state.repoFrequency = repoFrequency
    },
    getRepoCommitActivities:(state)=>{
      state.isLoading = true;
      state.repoCommitsActivities = null;
    },
    getRepoCommitActivitiesSuccess:(state,action)=>{
      state.isLoading = false;
      let data = action.payload
      let xCategories = data.map(d=>moment.unix(d.week).format("MM/DD/YY"))
      let graphData = data.map(d=>d.total)
      let repoCommitsActivities = {}
        if(data.length){
          repoCommitsActivities = {
                commits : {
                    name: "Commits",
                    data :graphData,
                    color:"green"
                },
                xCategories:[
                   ...xCategories
                ]
            }
        }
        state.repoCommitsActivities = repoCommitsActivities
    },
    getRepoContributorActivities:(state)=>{
      state.isLoading = true;
      state.contributorActivities = null
    },
    getRepoContributorActivitiesSuccess:(state,action)=>{
      state.isLoading = false
      let data = action.payload
      let graphData = []
      let xCategories = []
      let contributorActivities = {}
      if(data.length){
        let user = data[0]
        // let firstWeek = user.weeks[0].w
        // let lastWeek = user.weeks[user.weeks.length -1].w
        let catgoriesData = user.weeks.map(weekdata=>moment.unix(weekdata.w).format("MM/DD/YY") )
         xCategories = [
         ...catgoriesData
        ]
        data.forEach(user => {
          let userData = {}
          userData.name = user.author.login
          userData.data = []
          user.weeks.forEach(weekdata=>{
            userData.data.push(weekdata.d,weekdata.c)
          })
          graphData.push(userData)
      });
      contributorActivities = {
        graphData,
        xCategories
      }
      }
      state.contributorActivities  = contributorActivities
    }
  },
});

export const {
  getReposFetch,
  getReposFilterFetch,
  getReposSuccess,
  getReposFailure,
  getRepoDetails,
  getRepoDetailsSuccess,
  getRepoActivities,
  getRepoActivitiesSuccess,
  getRepoCommitActivities,
  getRepoCommitActivitiesSuccess,
  getRepoContributorActivities,
  getRepoContributorActivitiesSuccess
} = reposSlice.actions;

export default reposSlice.reducer;
