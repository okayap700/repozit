import React, { useEffect, useState } from "react";
import { Box, Text, Spinner, Heading, Link, Flex } from '@chakra-ui/react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

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

                  if (!response.ok) { throw new Error("Failed to fetch ${"); }
                  const data = await response.json();
                    setRepo( data );
                } catch (error) { console.error("Error fetching data: ", error); }
                finally{ setLoading(false); }
            }
            fetchRepoDetails();
        }, 
        [username, repoName]
    );

    // const containerVariants = {
    //   hidden: { opacity: 1 },
    //   visible: {
    //     opacity: 1,
    //     transition: { staggerChildren: 0.5, }, // delay each child by 0.3s
    //   },
    // };
  
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
        <Flex className="App" bg="brand.beig" minHeight="100vh" p="8" direction="column" align="center" size="lg">
          { repo ? (
            <> 
            <Heading as="h1" size="lg" mb="4" color="brand.brow">
              <p>{ repo.name }</p>
          </Heading>

          <MotionBox key={repo.id}
            bg="brand.gre"
            border="0.2px" borderRadius="lg" padding="6" marginBottom="4" boxShadow="lg"
            variants={itemVariants}   //make each box follow the stagger pattern
            initial="hidden" animate="visible" 
            // transition={{ delayChildren: index * 0.15}}    //stagger each box by 0.1s
            // whileHover={{ scale: 1.05, bg: 'brand.ash' }}    //slightly scale up on hover
            exit="hidden"     //disappear when component is removed
          >
            <Heading as="h2" size="md" mb="2" color="brand.gree">{ repo.description }</Heading >
            <Text mt='2' color="brand.brown">⭐ Stars: { repo.stargazers_count } | 🍴 Forks: { repo.forks_count } </Text>
            <Text mt='2' color="brand.brown">🗓️ Created: { new Date(repo.created_at).toLocaleDateString() } </Text>
            <Text mt='2' color="brand.brown">🗓️ Updated: { new Date(repo.updated_at).toLocaleDateString() } </Text>
            <Text mt='4' color="brand.brown">🔗 <Link href="{ repo.html_url }"> View on GitHub </Link></Text>
          </MotionBox>
          </> ) : <div>
          {loading ? (
              <Flex height="80vh" justifyContent="center" alignItems="center" minHeight="100vh">
                <Spinner boxSize="100px" color="brand.gre" />
              </Flex>
            ) : <Text as="h1" color="brand.gre" > Repo not found! </Text>} 
          </div>
          }
          
        </Flex>
      )
}

export default RepoDetails;