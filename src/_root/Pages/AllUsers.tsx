import { Button } from "@/components/ui/button";
import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";

const AllUsers = () => {
  const { data: getAllUsers } = useGetAllUsers();

  return (
    <div className="user-container">
      <div className="flex items-center gap-3">
        <img src="/icons/people.svg" width={36} height={36} />
        <h3 className="h3-bold md:h2-bold w-full text-left">All Users</h3>
      </div>
      {!getAllUsers ? (
        <div className="w-full h-full flex-center">
          <Loader />
        </div>
      ) : (
        <ul className="user-grid">
          {getAllUsers.documents.map((user) => (
            <li
              key={user.$id}
              className="flex flex-col items-center space-y-2 border-dark-2 border-2 p-6 rounded-2xl"
            >
              <img
                src={user.creator?.imageUrl}
                className="w-14 h-14 rounded-full"
              />
              <p>{user.creator?.userName}</p>
              <p className="text-light-4 text-xs">@{user.creator?.userName}</p>
              <Button className="bg-primary-600 hover:bg-primary-500 px-8 py-2 rounded-xl">
                Follow
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
