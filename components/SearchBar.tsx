import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchBar = (props: any) => {
  return (
    <InputGroup w="30rem">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input type="tel" placeholder="Search Subreddit" {...props} />
    </InputGroup>
  );
};

export default SearchBar;
