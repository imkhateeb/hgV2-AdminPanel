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
  const [sortByStatus, setSortByStatus] = useState(false);
  const [sortByUpvotes, setSortByUpvotes] = useState(false);
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
    if (sortByName) {
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
    if (sortByDesc) {
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

  const handleSortByStatus = () => {
    if (sortByStatus) {
      setFeeds([...feeds].sort((a, b) => {
        if (a.staus && !b.staus) {
          return -1;
        }
        if (!a.staus && b.staus) {
          return 1;
        }
      }))
    } else {
      setFeeds([...feeds].sort((a, b) => {
        if (a.staus && !b.staus) {
          return 1;
        }
        if (!a.staus && b.staus) {
          return -1;
        }
      }))
    }
  }

  const handleSortByUpvotes = () => {
    if ( sortByUpvotes ){
      setFeeds([...feeds].sort((a, b)=> {
        if ( a.upVotes.length > b.upVotes.length ){
          return 1;
        }
        if ( a.upVotes.length < b.upVotes.length ){
          return -1;
        }
        return 0;
      }))
    } else {
      setFeeds([...feeds].sort((a, b)=> {
        if ( a.upVotes.length > b.upVotes.length ){
          return -1;
        }
        if ( a.upVotes.length < b.upVotes.length ){
          return 1;
        }
        return 0;
      }))
    }
  }

  if (error) return <p>Error loading feeds: {error.message || 'Unknown error'}</p>;


  return (
    <div className="flex flex-col min-w-[900px] w-full mt-4">
      <div className="flex border-t-[1px] py-5 w-full">
        <div className="w-[15%] text-[14px] pl-5  font-semibold flex items-center gap-1">USER
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByName(!sortByName);
            sortByLexicalUser();
          }} />
        </div>
        <div className="w-[45%] text-[14px] pl-5 font-semibold flex items-center gap-1">DESCRIPTION
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByDesc(!sortByDesc)
            sortByLexicalDesc()
          }} />
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[14px] pl-5 font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setShowOldest(!showOldest)
            sortByTimeDate()
          }} />
        </div>
        <div className="w-[8%] text-center text-[14px] pl-5 font-semibold flex items-center gap-1">STATUS
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByStatus(!sortByStatus)
            handleSortByStatus()
          }} />
        </div>
        <div className="w-[8%] text-center text-[14px] pl-5 font-semibold flex items-center gap-1">UPVOTES
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByUpvotes(!sortByUpvotes);
            handleSortByUpvotes();
          }} /></div>
        <div className="w-[9%] text-center text-[14px] pl-5 font-semibold">ACTION</div>
      </div>
      {
        loading && !feedData ? <SkeletonAnimation totalFeeds={totalFeeds} /> :
          (feeds && feeds.slice(feedLimit * (pageNumber - 1), feedLimit * pageNumber > feeds.length ? feeds.length : feedLimit * pageNumber).map((feed, index) => {
            return (
              <Feed
                key={feed?.feedDetails + index}
                feed={feed}
              />
            )
          }))
      }
    </div>
  );
}