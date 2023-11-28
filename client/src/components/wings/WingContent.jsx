import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchWings } from "../../redux/slices/wingSlice";
import SkeletonAnimation from "../utility/SkeletonAnimation";

import Wing from "./Wing";
import { filterWings } from "../../utils/filterWings";

export default function WingContent({ queries }) {
  const [wings, setWings] = useState([]);

  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);
  const dispatch = useDispatch();
  const { wingData, loading, error } = useSelector((state) => state.wings);

  const fetchAllwings = () => {
    try {
      dispatch(fetchWings());
    } catch (error) {
      console.log("Error while gettting all wings", error);
    }
  }
  useEffect(() => {
    fetchAllwings();
  }, [dispatch]);

  useEffect(() => {
    if (wingData?.length) {
      if (!queries?.length) {
        setWings(wingData);
      } else {
        const filteredwings = filterWings(wingData, queries);
        setWings(filteredwings);
      }
    }
  }, [wingData, queries]);


  const sortByTimeDate = () => {

  }

  const sortByLexicalUser = () => {
    
  }

  const sortByLexicalDesc = () => {

  }

  const handleSortByStatus = () => {
  }


  if (error) return <p>Error loading wings: {error.message || 'Unknown error'}</p>;


  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[20%] text-[16px] font-semibold flex items-center gap-1">WING
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByName(!sortByName);
            sortByLexicalUser();
          }} />
        </div>
        <div className="w-[40%] text-[16px] font-semibold flex items-center gap-1">DESCRIPTION
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByDesc(!sortByDesc)
            sortByLexicalDesc()
          }} />
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[16px] font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setShowOldest(!showOldest)
            sortByTimeDate()
          }} />
        </div>
        <div className="w-[15%] flex relative gap-1 items-center text-[16px] font-semibold">
          <h1>LEAD</h1>
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setShowOldest(!showOldest)
            sortByTimeDate()
          }} />
        </div>
        <div className="w-[10%] text-center text-[16px] font-semibold">ACTION</div>
      </div>
      {
        loading ? <SkeletonAnimation /> :
          (wings && wings.map((wing, index) => {
            return (
              <Wing
                key={wings + index}
                feed={wing}
              />
            )
          }))
      }
    </div>
  );
}