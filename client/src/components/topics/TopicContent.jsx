import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopics } from "../../redux/slices/topicSlice";
import SkeletonAnimation from "../utility/SkeletonAnimation";

import Topic from './Topic';
import { filterTopics } from "../../utils/filterTopics";

export default function TopicContent({ queries, levelId }) {
  const [topics, setTopics] = useState([]);

  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);

  const dispatch = useDispatch();
  const { topicData, loading, error } = useSelector((state) => state.topics);

  const fetchAllTopics = () => {
    try {
      dispatch(fetchTopics({id: levelId}));
    } catch (error) {
      console.log("Error while gettting all topics", error);
    }
  };

  useEffect(() => {
    fetchAllTopics();
  }, [dispatch]);


  useEffect(() => {
    if (topicData?.length) {
      if (!queries?.length) {
        setTopics(topicData);
      } else {
        const filteredtopics = filterTopics(topicData, queries);
        setTopics(filteredtopics);
      }
    }
  }, [topicData, queries]);


  const sortByTimeDate = () => {};

  const sortByLexicalUser = () => {};

  const sortByLexicalDesc = () => {};

  if (error)
    return <p>Error loading topics: {error.message || "Unknown error"}</p>;

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex border-t-2 py-4 w-full">
        <div className="w-[30%] text-[16px] font-semibold flex items-center gap-1">
          TITLE
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByName(!sortByName);
              sortByLexicalUser();
            }}
          />
        </div>
        <div className="w-[30%] text-[16px] font-semibold flex items-center gap-1">
          CREATED BY
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[20%] text-[16px] font-semibold flex items-center gap-1">
          SUB-TOPICS
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setSortByDesc(!sortByDesc);
              sortByLexicalDesc();
            }}
          />
        </div>
        <div className="w-[20%] flex relative gap-1 items-center text-[16px] font-semibold justify-center">
          <h1>ACTIONS</h1>
          <BiSort
            className="cursor-pointer hover:shadow-inner hover:shadow-pink-600"
            onClick={() => {
              setShowOldest(!showOldest);
              sortByTimeDate();
            }}
          />
        </div>
      </div>
      {loading ? (
        <SkeletonAnimation />
      ) : (
        topics.length &&
        topics.map((topic, index) => {
          return <Topic key={topic._id + index} topic={topic} />;
        })
      )}
    </div>
  );
}
