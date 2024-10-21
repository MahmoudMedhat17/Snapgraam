import { Models } from "appwrite";
import Loader from "./Loader";
import GridPosts from "./GridPosts";

type SearchResultsProps = {
  searchedPosts: Models.Document[] | [];
  isSearchFetching: boolean;
};

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPosts posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 w-full text-center">No results found</p>
  );
};

export default SearchResults;
