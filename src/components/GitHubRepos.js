import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Text, Box, Heading, Link, Spinner, Flex, background } from "@chakra-ui/react";
import { motion } from "framer-motion";


const MotionBox = motion.create(Box);    //creates a motion-enabled Chakra Box


function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = 'okayap700';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) { throw new Error('Failed to Fetch repositories'); }

        setRepos(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();

    // throw new Error("Test error");

  }, [username]
  );

  // Define parent variants to stagger children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, }, // delay each child by 0.3s
    },
  };

  //  Animation variants for each repository box
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },   //start below and faded out
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }, //fade in and swipe up
    },
  };

  return (
    <Flex bg="brand.beig" minHeight="100vh" p="8" direction="column" align="center">

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <div className="App">

          <Box padding="4">
            <Heading as="h1" size="lg" mb="4"  color="brand.brow">
              Welcome, These are my GitHub repos:
            </Heading>

          </Box>

          {loading ? (
              <Flex height="80vh" justifyContent="center" alignItems="center" minHeight="100vh">
                <Spinner boxSize="100px" color="brand.gre" />
              </Flex>
            ) : null}

          
          <Box>
            {repos.map(( repo ) => (
              <Link as={RouterLink} to={`/repo/${repo.name}`} key={repo.id} _hover={{ textDecoration: 'none', bg: 'brand.ash' }}>
                <MotionBox key={repo.id}
                bg="brand.gre"
                border="0.2px" borderRadius="lg" padding="6" marginBottom="4" boxShadow="lg"
                variants={itemVariants}   //make each box follow the stagger pattern
                initial="hidden" animate="visible"
                
                // transition={{ delayChildren: index * 0.15}}    //stagger each box by 0.1s
                whileHover={{ scale: 1.05, bg: 'brand.ash' }}    //slightly scale up on hover
                exit="hidden"     //disappear when component is removed
              >
                <Heading as="h2" size="md" mb="2" cursor="pointer">
                <Link as={RouterLink} to={`/repo/${repo.name}`} color="brand.gree">{repo.name}</Link>
                </Heading>
                <Text color="brand.brown">{repo.description ? repo.description : 'No description available'}</Text>
                <Text mt='2'>⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}</Text>
                </MotionBox>
              </Link>
              
            ))
            }
          </Box>
        </div>
      </motion.div>
    </Flex>
  );
}

export default GitHubRepos;