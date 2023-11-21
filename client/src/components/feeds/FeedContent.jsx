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
  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);

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


  const sortByTimeDate = () => {
    if (showOldest) {
      setFeeds([...feeds].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }));
    } else {
      setFeeds([...feeds].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }))
    }
  }

  const sortByLexicalUser = () => {
    if ( sortByName ){
      setFeeds([...feeds].sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }))
    } else {
      setFeeds([...feeds].sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }))
    }
  }

  const sortByLexicalDesc = () => {
    if ( sortByDesc ){
      setFeeds([...feeds].sort((a, b) => {
        let descA = a.feedDetails.toUpperCase();
        let descB = b.feedDetails.toUpperCase();
        if (descA < descB) {
          return -1;
        }
        if (descA > descB) {
          return 1;
        }
        return 0;
      }))
    } else {
      setFeeds([...feeds].sort((a, b) => {
        let descA = a.feedDetails.toUpperCase();
        let descB = b.feedDetails.toUpperCase();
        if (descA < descB) {
          return 1;
        }
        if (descA > descB) {
          return -1;
        }
        return 0;
      }))
    }
  }

  if (error) return <p>Error loading feeds: {error.message || 'Unknown error'}</p>;


  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[15%] text-[16px] font-semibold flex items-center gap-1">USER
          <BiSort className="cursor-pointer" onClick={() => {
            setSortByName(!sortByName);
            sortByLexicalUser();
          }} />
        </div>
        <div className="w-[45%] text-[16px] font-semibold flex items-center gap-1">DESCRIPTION
          <BiSort className="cursor-pointer" onClick={() => {
            setSortByDesc(!sortByDesc)
            sortByLexicalDesc()
          }} />
        </div>
        <div className="w-[10%] flex relative gap-1 items-center text-[16px] font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer" onClick={() => {
            setShowOldest(!showOldest)
            sortByTimeDate()
          }} />
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