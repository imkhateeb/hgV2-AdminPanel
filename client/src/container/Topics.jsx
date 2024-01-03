import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import TopicContent from "../components/topics/TopicContent";
import FilterDropdown from "../components/utility/Filter";

const Topics = () => {
  const [queries, setQueries] = useState([]);

  const { levelId } = useParams();

  return (
    <section className="bg-bgSecondary rounded-3xl p-5 w-full">
      <div className="w-full flex items-center my-2">
        <h1 className="text-white text-3xl font-bold">Topics</h1>
      </div>
      <div className="flex py-2 items-center justify-between">
        <div className="flex gap-1">
          <FilterDropdown setQueries={setQueries} />
        </div>
        <Link
          to={`/add-topic/${levelId}`}
          className="bg-pink-600 flex py-[4px] px-4 items-center gap-3 rounded-lg cursor-pointer"
        >
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <div className="w-full overflow-auto">
        <TopicContent queries={queries} levelId={levelId} />
      </div>
    </section>
  );
};

export default Topics;
