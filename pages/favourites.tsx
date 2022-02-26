import FavouriteListItem from "@/components/FavouriteListItem";
import { Box, Button, Flex, List, Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Favourites: NextPage = () => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavourites()
      .then((newState) => {
        setPosts(newState ? newState : []);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // function for loading in favourites to the page
  const loadFavourites = async () => {
    const storage = window.localStorage;
    const favouritesJSON = storage.getItem("favouritePosts");

    if (!favouritesJSON) return;

    const postIds = JSON.parse(favouritesJSON);

    // fetch posts from reddit
    return await fetchPosts(postIds);
  };

  // function for fetching posts data from reddit
  const fetchPosts = async (postIds: Array<string>) => {
    // get all posts based on ids in postIds state
    let newPostsState: Array<any> = [];
    for (const postId of postIds) {
      // fetch post data
      const response = await fetch(`https://www.reddit.com/${postId}/.json`);
      const data = await response.json();

      // save to state
      newPostsState.push(data[0].data.children[0]);
    }
    return newPostsState;
  };

  // handler for remove favourite button click
  const handleRemoveFavourite = (id: string) => {
    const storage = window.localStorage;
    const favouritesJSON = storage.getItem("favouritePosts");

    if (!favouritesJSON) return;

    const postIds = JSON.parse(favouritesJSON);

    // filter out id being removed
    const filteredPostIds = postIds.filter((postId: string) => postId !== id);

    // put back into local storage
    storage.setItem("favouritePosts", JSON.stringify(filteredPostIds));

    // remove from state to update page
    let newPostsState = [...posts];
    const filteredPostsState = newPostsState.filter((post) => {
      return post.data.id !== id;
    });
    setPosts(filteredPostsState);
  };

  return (
    <Box mb="4rem">
      {loading && (
        <Flex justify="center" w="100%" mt="10rem">
          <Spinner color="red.400" />
        </Flex>
      )}
      {!loading && posts.length > 0 && (
        <List spacing={3}>
          {posts.map((post) => (
            <FavouriteListItem
              key={post.data.id}
              title={post.data.title}
              score={post.data.score}
              link={post.data.permalink}
              onClick={() => handleRemoveFavourite(post.data.id)}
            />
          ))}
        </List>
      )}
      {!loading && posts.length == 0 && (
        <>
          <Text fontSize="2xl" mt="4rem" mb="0.5rem">
            No Favourites Added
          </Text>
        </>
      )}
    </Box>
  );
};

export default Favourites;
