import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import SearchResults from "@/components/shared/SearchResults";
import GridPosts from "@/components/shared/GridPosts";
import {
  useGetPosts,
  useGetSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useGetSearchPosts(debouncedValue);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every(
      (item) => item && item.documents && item.documents.length === 0
    );

  // console.log(posts);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 w-full px-4 rounded-xl bg-dark-4">
          <img src="/icons/search.svg" width={24} height={24} />
          <Input
            type="text"
            className="explore-search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="mt-16 mb-7 w-full max-w-5xl flex-between">
          <h3 className="h3-bold md:h2-bold">Popular Today</h3>
          <div className="flex-center gap-3 bg-dark-3 p-4 rounded-xl cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img src="/icons/filter.svg" width={24} height={24} />
          </div>
        </div>

        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {shouldShowSearchResults ? (
            <SearchResults
              searchedPosts={searchedPosts}
              isSearchFetching={isSearchFetching}
            />
          ) : shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">
              End of the posts
            </p>
          ) : (
            posts.pages.map((post, index) => {
              const documents = post?.documents || [];

              return <GridPosts posts={documents} key={`page-${index}`} />;
            })
          )}
        </div>
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
