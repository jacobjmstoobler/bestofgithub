import React from "react";
// import { Counter } from "./features/counter/Counter";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/Components/Layout";
import Dashboard from "./app/Containers/dashboard";
import RepoDetails from "./app/Containers/dashboard/repoDetails";

const DashboardPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

const RepoDetailPage = () => {
  return (
    <Layout>
      <RepoDetails />
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path=":owner/:repo" element={<RepoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
