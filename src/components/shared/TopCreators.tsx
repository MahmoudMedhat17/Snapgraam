import { useTopCreators } from "@/lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";

const TopCreators = () => {
  const { data: topCreators } = useTopCreators();

  console.log(topCreators);

  return (
    <div className="flex flex-wrap gap-14">
      {topCreators?.documents.map((creator) => (
        <div className="flex flex-col items-center space-y-4 border-2 border-dark-4 p-10 rounded-2xl">
          <img src={creator.imageUrl} className="w-20 h-20 rounded-full" />
          <p className="text-white">{creator.userName}</p>
          <p className="semi-bold text-light-3 text-sm">Followed by JSM</p>
          <Button className="bg-primary-600 hover:bg-primary-500 px-6 py-2 rounded-xl">
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TopCreators;
