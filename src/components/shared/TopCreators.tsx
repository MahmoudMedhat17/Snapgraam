import { useTopCreators } from "@/lib/react-query/queriesAndMutations";

const TopCreators = () => {
  const { data: allUsers } = useTopCreators();

  console.log(allUsers);
  return <div></div>;
};

export default TopCreators;
