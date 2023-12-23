import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import SkeletonAnimation from "../utility/SkeletonAnimation";
import { fetchLevels } from "../../redux/slices/levelSlice";
import Level from "./Level";

// import { filterFeeds } from "../../utils/filterFeeds";


export default function LevelContent({ searchTerm, levelLimit, setTotalLevels, pageNumber, totalLevels }) {

  const [levels, setLevels] = useState([]);
  // const [showOldest, setShowOldest] = useState(false);
  // const [sortByName, setSortByName] = useState(false);
  // const [sortByDesc, setSortByDesc] = useState(false);
  // const [sortByStatus, setSortByStatus] = useState(false);
  // const [sortByUpvotes, setSortByUpvotes] = useState(false);
  const dispatch = useDispatch();
  const { levelData, loading, error } = useSelector((state) => state.levels);

  const fetchAllLevels = () => {
    try {
      dispatch(fetchLevels({id : '6585cafdb35c9e93e4553462'}));
    } catch (error) {
      console.log("Error while gettting all levels", error);
    }
  }
  useEffect(() => {
    fetchAllLevels();
  }, [dispatch]);

  useEffect(() => {
    // if (feedData?.length) {
    //   if (!searchTerm?.trim() && !queries?.length) {
    //     setTotalFeeds(feedData?.length);
    //     setFeeds(feedData);
    //   } else {
    //     const filteredFeeds = filterFeeds(feedData, searchTerm, queries);
    //     setTotalFeeds(filteredFeeds?.length);
    //     setFeeds(filteredFeeds);
    //   }
    // }

    setTotalLevels(levelData?.length)
    setLevels(levelData)
  }, [levelData, searchTerm]);


  // const sortByTimeDate = () => {
  //   if (showOldest) {
  //     setFeeds([...feeds].sort((a, b) => {
  //       return new Date(a.createdAt) - new Date(b.createdAt);
  //     }));
  //   } else {
  //     setFeeds([...feeds].sort((a, b) => {
  //       return new Date(b.createdAt) - new Date(a.createdAt);
  //     }))
  //   }
  // }

  // const sortByLexicalUser = () => {
  //   if (sortByName) {
  //     setFeeds([...feeds].sort((a, b) => {
  //       let nameA = a.name.toUpperCase();
  //       let nameB = b.name.toUpperCase();
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }
  //       return 0;
  //     }))
  //   } else {
  //     setFeeds([...feeds].sort((a, b) => {
  //       let nameA = a.name.toUpperCase();
  //       let nameB = b.name.toUpperCase();
  //       if (nameA < nameB) {
  //         return 1;
  //       }
  //       if (nameA > nameB) {
  //         return -1;
  //       }
  //       return 0;
  //     }))
  //   }
  // }

  // const sortByLexicalDesc = () => {
  //   if (sortByDesc) {
  //     setFeeds([...feeds].sort((a, b) => {
  //       let descA = a.feedDetails.toUpperCase();
  //       let descB = b.feedDetails.toUpperCase();
  //       if (descA < descB) {
  //         return -1;
  //       }
  //       if (descA > descB) {
  //         return 1;
  //       }
  //       return 0;
  //     }))
  //   } else {
  //     setFeeds([...feeds].sort((a, b) => {
  //       let descA = a.feedDetails.toUpperCase();
  //       let descB = b.feedDetails.toUpperCase();
  //       if (descA < descB) {
  //         return 1;
  //       }
  //       if (descA > descB) {
  //         return -1;
  //       }
  //       return 0;
  //     }))
  //   }
  // }

  // const handleSortByStatus = () => {
  //   if (sortByStatus) {
  //     setFeeds([...feeds].sort((a, b) => {
  //       if (a.staus && !b.staus) {
  //         return -1;
  //       }
  //       if (!a.staus && b.staus) {
  //         return 1;
  //       }
  //     }))
  //   } else {
  //     setFeeds([...feeds].sort((a, b) => {
  //       if (a.staus && !b.staus) {
  //         return 1;
  //       }
  //       if (!a.staus && b.staus) {
  //         return -1;
  //       }
  //     }))
  //   }
  // }

  // const handleSortByUpvotes = () => {
  //   if ( sortByUpvotes ){
  //     setFeeds([...feeds].sort((a, b)=> {
  //       if ( a.upVotes.length > b.upVotes.length ){
  //         return 1;
  //       }
  //       if ( a.upVotes.length < b.upVotes.length ){
  //         return -1;
  //       }
  //       return 0;
  //     }))
  //   } else {
  //     setFeeds([...feeds].sort((a, b)=> {
  //       if ( a.upVotes.length > b.upVotes.length ){
  //         return -1;
  //       }
  //       if ( a.upVotes.length < b.upVotes.length ){
  //         return 1;
  //       }
  //       return 0;
  //     }))
  //   }
  // }

  if (error) return <p>Error loading levels: {error.message || 'Unknown error'}</p>;


  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[25%] text-[16px] font-semibold flex items-center gap-1">USER
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            // setSortByName(!sortByName);
            // sortByLexicalUser();
          }} />
        </div>
        {/* <div className="w-[45%] text-[16px] font-semibold flex items-center gap-1">DESCRIPTION
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            // setSortByDesc(!sortByDesc)
            // sortByLexicalDesc()
          }} />
        </div> */}
        <div className="w-[25%] flex relative gap-1 items-center text-[16px] font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            // setShowOldest(!showOldest)
            // sortByTimeDate()
          }} />
        </div>
        {/* <div className="w-[8%] text-center text-[16px] font-semibold flex items-center gap-1">STATUS
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            // setSortByStatus(!sortByStatus)
            // handleSortByStatus()
          }} />
        </div> */}
        <div className="w-[25%] text-center text-[16px] font-semibold flex items-center gap-1">ENROLLED
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            // setSortByUpvotes(!sortByUpvotes);
            // handleSortByUpvotes();
          }} /></div>
        <div className="w-[25%] text-center text-[16px] font-semibold">ACTION</div>
      </div>
      {
        loading && !levelData  ? <SkeletonAnimation totalLevels={totalLevels} /> :
          (levels && levels.slice(levelLimit * (pageNumber - 1), levelLimit * pageNumber > levels.length ? levels.length : levelLimit * pageNumber).map((level, index) => {
            return (
              <Level
                key={index}
                level={level}
              />
            )
          }))
      }
    </div>
  );
}

