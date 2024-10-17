import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, Heading, Link } from '@chakra-ui/react';
import { useParams } from "react-router-dom";

function RepoDetails() {

    const { repoName } = useParams();
    const [repo, setRepo] = useState(null);
    const [loading, setLoading] = useState(true);
    const username = 'okayap700';

    useEffect(
        () => {
            const fetchRepoDetails = async () => {
                
                try {
                    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

                    if (!response.ok) { throw new Error("Failed to fetch repository"); }

                    setRepo(await response.json() );
                } catch (error) { console.error("Error fetching data: ", error); }
                finally{ setLoading(false); }

            }
            fetchRepoDetails();
        }, 
        [username, repoName]
    )

    if ( loading ){ return <Spinner size="xl" alignSelf="center"/>; }

    return (
        <div className="App">
    
          <Box padding="4">
            <Heading as="h1" size="lg" mb="4">
              <p>{ repo.name }</p>
            </Heading>
            <Text>{ repo.description } || "No descritption available" </Text>
            <Text mt='2'>🌟 Stars: { repo.stargazers_count } | 🍴 Forks: { repo.forks_count } </Text>
            <Text mt='2'>🗓️ Created: { new Date(repo.created_at).toLocaleDateString() } </Text>
            <Text mt='2'>🗓️ Updated: { new Date(repo.updated_at).toLocaleDateString() } </Text>
            <Text mt='4'>🔗 <Link href="{ repo.html_url }"> View on GitHub </Link></Text>
            
          </Box>
        </div>
      )
}

export default RepoDetails;