import SearchBar from "@/components/SearchBar";
import SearchListItem from "@/components/SearchListItem";
import { Box, Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Array<any>>([]);

  // Handler for when search input text changes
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // handler or when search is executed by search button or pressing enter in search field
  const handleSearch = async () => {
    try {
      const { data } = await getRedditPosts(searchTerm);
      if (data) setPosts(data.children);
    } catch (e) {
      console.log(e);
    }
  };

  // handler for when favourite button is clicked
  const handleFavourite = (postId: string) => {
    const storage = window.localStorage;

    // get array of current favourites or empty array if none
    const favouritesJSON = storage.getItem("favouritePosts");

    if (!favouritesJSON) {
      // empty favourites, so create new and return
      storage.setItem("favouritePosts", JSON.stringify([postId]));
      return;
    }

    let favourites = JSON.parse(favouritesJSON);

    // add to favourites
    if (favourites.includes(postId)) return;
    favourites.push(postId);

    // set the storage
    storage.setItem("favouritePosts", JSON.stringify(favourites));
  };

  // data fetch function to get 10 reddit posts with search term
  const getRedditPosts = async (searchTerm: string) => {
    const response = await fetch(
      `https://www.reddit.com/r/${searchTerm}/hot/.json?limit=8`
    );

    return await response.json();
  };

  return (
    <Box mb="4rem">
      <Flex>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyUp={(event: any) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch} mx="1rem" width="10rem">
          Search
        </Button>
      </Flex>
      <Text fontSize="4xl" fontWeight="bold" mt="1rem" mb="0.5rem">
        Results
      </Text>
      <List spacing={3}>
        {posts.length > 0 &&
          posts.map((post) => (
            <SearchListItem
              key={post.data.id}
              title={post.data.title}
              score={post.data.score}
              link={post.data.permalink}
              onClick={() => {
                handleFavourite(post.data.id);
              }}
            />
          ))}
        {posts.length === 0 && <Text>No Search Results</Text>}
      </List>
    </Box>
  );
};

export default Home;
