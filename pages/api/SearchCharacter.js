import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});


export default async (req, res) => {
  const search = req.body;
  try{
    const { data } = await client.query({
      query: gql`
      query{
        characters(filter: {name: "${search.name}"}){
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
    res.status(200).json({characters: data.characters.results, error: null});
  } catch(error){
    if(error.message === "404: Not found"){
      res.status(404).json({character: null, error: "No Character Found"});
    } else {
      res.status(500).json({character: null, error: "Internal Server Error"});
    }
  }
}