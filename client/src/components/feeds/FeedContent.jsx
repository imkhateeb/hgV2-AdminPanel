import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeeds } from "../../redux/slices/feedSlice";

import Feed from "./Feed";
import { filterFeeds } from "../../utils/filterFeeds";
filterFeeds

export default function FeedContent({ searchTerm, queries }) {
  const [feeds, setFeeds] = useState([]);
  const [showSortingDiv, setShowSortingDiv] = useState(false);
  const dispatch = useDispatch();
  const { feedData, loading, error } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm?.trim() && !queries?.length) {
      setFeeds(feedData);
    } else {
      setFeeds(filterFeeds(feedData, searchTerm, queries));
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

  if (loading) return <p>Loading feeds...</p>;
  if (error) return <p>Error loading feeds: {error}</p>;


  return (
    <table className="w-full mt-4 overflow-x-scroll">
      <thead className="border-t-2 h-14">
        <tr>
          <th className="text-left w-[20%] text-[15px]">USER</th>
          <th className="text-left w-[40%] text-[15px]">DESCRIPTION</th>
          <th className="text-left w-[20%]">
            <div className="flex relative items-center gap-2 text-[15px]">
              <h1>CREATED ON</h1>
              <BiSort className="cursor-pointer" onClick={() => { setShowSortingDiv(true) }} />
              {showSortingDiv &&
                (
                  <div className="absolute flex flex-col bg-bgTertiary ml-24 mt-12 rounded-lg">
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
          </th>
          <th className="text-left w-[10%] text-[15px]">STATUS</th>
          <th className="text-left w-[10%] text-[15px]">ACTION</th>
          <th className="text-left w-[10%] text-[15px]">UPVOTES</th>
        </tr>
      </thead>
      {feeds && feeds.map((feed, index) => {
        return (
          <Feed
            key={feed?.feedDetails + index}
            feed={feed}
          />
        )
      })}

    </table>
  );
}
