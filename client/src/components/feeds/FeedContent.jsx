import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeeds } from "../../redux/slices/feedSlice";
import SkeletonAnimation from "../utility/SkeletonAnimation";

import Feed from "./Feed";
import { filterFeeds } from "../../utils/filterFeeds";
filterFeeds

export default function FeedContent({ searchTerm, queries, feedLimit, setTotalFeeds, pageNumber, totalFeeds }) {
  const [feeds, setFeeds] = useState([]);
  const [showSortingDiv, setShowSortingDiv] = useState(false);
  const dispatch = useDispatch();
  const { feedData, loading, error } = useSelector((state) => state.feeds);

  const fetchAllFeeds = () => {
    try {
      dispatch(fetchFeeds());
    } catch (error) {
      console.log("Error while gettting all feeds", error);
    }
  }
  useEffect(() => {
    fetchAllFeeds();
  }, [dispatch]);

  useEffect(() => {
    if (feedData?.length) {
      if (!searchTerm?.trim() && !queries?.length) {
        setTotalFeeds(feedData?.length);
        setFeeds(feedData);
      } else {
        const filteredFeeds = filterFeeds(feedData, searchTerm, queries);
        setTotalFeeds(filteredFeeds?.length);
        setFeeds(filteredFeeds);
      }
    }
  }, [feedData, searchTerm, queries]);

  const handleOldest = () => {
    setFeeds([...feeds].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }));
  };

  const handleNewest = () => {
    setFeeds([...feeds].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }))
  }

  if (error) return <p>Error loading feeds: {error.message || 'Unknown error'}</p>;


  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[15%] text-[16px] font-semibold">USER</div>
        <div className="w-[45%] text-[16px] font-semibold">DESCRIPTION</div>
        <div className="w-[10%] flex relative gap-1 items-center text-[16px] font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer" onClick={() => { setShowSortingDiv(true) }} />
          {showSortingDiv &&
            (
              <div className="absolute flex flex-col bg-bgTertiary ml-[95px] mt-12 rounded-lg">
                <button
                  type="button"
                  className="py-1 px-3 cursor-pointer hover:bg-bgSecondary transition-all duration-200 ease-in"
                  onClick={() => {
                    setShowSortingDiv(false);
                    handleNewest();
                  }}
                >Latest</button>
                <button
                  type="button"
                  className="py-2 px-5 cursor-pointer hover:bg-bgSecondary transition-all duration-200 ease-in"
                  onClick={() => {
                    setShowSortingDiv(false);
                    handleOldest();
                  }}
                >Oldest</button>
              </div>
            )}
        </div>
        <div className="w-[10%] text-center text-[16px] font-semibold">STATUS</div>
        <div className="w-[10%] text-center text-[16px] font-semibold">UPVOTES</div>
        <div className="w-[10%] text-center text-[16px] font-semibold">ACTION</div>
      </div>
      {
        loading ? <SkeletonAnimation totalFeeds={totalFeeds} /> :
          (feeds && feeds.slice(feedLimit * (pageNumber - 1), feedLimit * pageNumber > feeds.length ? feeds.length : feedLimit * pageNumber).map((feed, index) => {
            return (
              <Feed
                key={feed?.feedDetails + index}
                feed={feed}
              />
            )
          }))
      }
    </div >
  );
}