import TopCreators from "./TopCreators";

const Rightbar = () => {
  return (
    <div className="hidden xl:flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
      <h3 className="h3-bold md:h2-bold text-left w-full">Top Creators</h3>
      <TopCreators />
    </div>
  );
};

export default Rightbar;
