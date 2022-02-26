import { ArrowUpIcon, StarIcon } from "@chakra-ui/icons";
import { Button, Flex, Link, ListItem, Text } from "@chakra-ui/react";

interface SearchListItemProps {
  title: string;
  score: string;
  link: string;
  onClick: () => any;
}

const SearchListItem = ({
  title,
  score,
  link,
  onClick,
}: SearchListItemProps) => {
  return (
    <ListItem>
      <Flex
        borderRadius="0.25rem"
        align=""
        justify="space-between"
        backgroundColor="gray.100"
        px={4}
        py={4}
      >
        <Flex direction="column">
          <Text fontSize="lg" maxW="45rem" mb="0.5rem">
            {title}
          </Text>
          <Flex align="center" mb="0.5rem">
            <ArrowUpIcon color="red.400" mr="0.5rem" />
            <Text color="red.400">{score}</Text>
          </Flex>
          <Link href={`https://reddit.com${link}`} color="blue.400" isExternal>
            View Comments
          </Link>
        </Flex>
        <Button
          onClick={onClick}
          leftIcon={<StarIcon />}
          colorScheme="yellow"
          variant="outline"
        >
          Favourite
        </Button>
      </Flex>
    </ListItem>
  );
};

export default SearchListItem;
