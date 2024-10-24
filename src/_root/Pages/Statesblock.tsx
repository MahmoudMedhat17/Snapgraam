import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

type StatesblockProps = {
  value: string | number;
  label: string;
};

const Statesblock = ({ value, label }: StatesblockProps) => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <div className="flex gap-3 lg:gap-8">
      <div className="flex-center flex-col gap-3">
        <p className="text-primary-500 small-semibold lg:body-bold">
          {currentUser?.posts.length}
        </p>
        <p className="text-light-2 small-medium lg:base-medium">Posts</p>
      </div>
      <div className="flex-center flex-col gap-3">
        <p className="text-primary-500 small-semibold lg:body-bold">{value}</p>
        <p className="text-light-2 small-medium lg:base-medium">{label}</p>
      </div>
      <div className="flex-center flex-col gap-3">
        <p className="text-primary-500 small-semibold lg:body-bold">{value}</p>
        <p className="text-light-2 small-medium lg:base-medium">{label}</p>
      </div>
    </div>
  );
};

export default Statesblock;
