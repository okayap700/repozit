import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GitHubRepos from './components/GitHubRepos';
import RepoDetails from "./components/RepoDetails";
// import { ChakraProvider, extendTheme, Button, Text, Box, Heading, Link, Divider, Spinner } from "@chakra-ui/react";
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return(
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={ <GitHubRepos /> } />
          <Route path="/repo/:repoName" element={<RepoDetails />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App;