import Head from 'next/head'
import { useState } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from '../styles/Home.module.css'

import Character from '../components/Character';

import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast
} from "@chakra-ui/react";

export default function Home(results) {

  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);

  return (
      <Flex direction="column" align="center" justify="center" >

        <Head>
          <title>Graphql Playground</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Box mb={4} flexDirection="column" align="center" justify="center" py={8}>
          <Heading as="h1" size="2xl" mb={8}>Rick And Morty</Heading>
          <Character characters={characters} />
        </Box>

      </Flex>    
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  })
  const { data } = await client.query({
    query: gql`
    query{
      characters(page: 1){
        info{
          count
          pages
        }
        results{
          name
          id
          location{
            id
            name
          }
          origin{
            id
            name
          }
          episode{
            id
            episode
            air_date
          }
          image
        }
      }
    }
    `
  });

return {
  props : {
    characters : data.characters.results
  }
}
}
