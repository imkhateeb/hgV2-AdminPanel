import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import AssignmentContent from "../components/assignments/AssignmentContent";

import FilterDropdown from "../components/utility/Filter";

const Assignments = () => {
  const [queries, setQueries] = useState([]);

  const { levelId } = useParams();

  return (
    <section className="bg-bgSecondary rounded-3xl p-5 w-full">
      <div className="w-full flex items-center my-2">
        <h1 className="text-white text-3xl font-bold">Assignments</h1>
      </div>
      <div className="flex py-2 items-center justify-between">
        <div className="flex gap-1">
          <FilterDropdown
            setQueries={setQueries}
          />
        </div>
        <Link to={`/add-assignment/${levelId}`} className="bg-pink-600 flex py-[4px] px-4 items-center gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <AssignmentContent
        queries={queries}
        levelId={levelId}
      />

    </section>
  );
};

export default Assignments;