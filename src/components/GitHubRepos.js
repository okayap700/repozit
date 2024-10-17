import React, { useEffect, useState } from 'react';
import { Text, Box, Heading, Link, Spinner } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";


function GitHubRepos() {
    const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = 'okayap700';

  useEffect( () => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if ( !response.ok ) { throw new Error('Failed to Fetch repositories'); }

        setRepos( await response.json() );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();

    // throw new Error("Test error");
    
  },  [ username ]
);

  return (
    <div className="App">

      <Box padding="4">
        <Heading as="h1" size="lg" mb="4">
          Welcome! These are my GitHub repos:
        </Heading>

        { loading ? <Spinner size="xl" alignSelf="center" /> : null }
      </Box>

      <Box>

        { repos.map( ( repo ) => (
            <Box key={repo.id} border="1px" borderRadius="md" padding="4" marginBottom="4">
              <Heading>
                <Link as={ RouterLink } to={`/repo/${ repo.name }`}>{ repo.name }</Link>
              </Heading>
              <Text fontSize="xl" fontWeight="bold">{ repo.description ? repo.description : 'No description available'}</Text>
              <Text mt='2'>🌟 Stars: { repo.stargazers_count } | 🍴 Forks: { repo.forks_count }</Text>
            </Box>
          ))
        }
      </Box>
    </div>
  );
}

export default GitHubRepos;