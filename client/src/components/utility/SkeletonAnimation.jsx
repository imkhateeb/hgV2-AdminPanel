const SkeletonRow = () => {
  return (
    <div className="flex animate-pulse gap-5 w-full items-center">
      <div className="w-[15%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
      <div className="w-[45%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
      <div className="w-[10%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
      <div className="w-[10%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
      <div className="w-[10%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
      <div className="w-[10%] bg-gray-300 my-[10px] py-3 rounded-full"></div>
    </div>
  );
};

const SkeletonAnimation = ({totalFeeds}) => {
  return (
    <div className="w-full">
        {[...Array((totalFeeds === 0) ? 12 : 11)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
    </div>
  );
};

export default SkeletonAnimation;
