import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import WingContent from "../components/wings/WingContent";
import FilterDropdown from "../components/utility/Filter";

const Wings = () => {
  const [queries, setQueries] = useState([]);


  return (
    <section className="bg-bgSecondary rounded-3xl p-5 w-full">
      <div className="w-full flex items-center my-2">
        <h1 className="text-white text-3xl font-bold">Wings</h1>
      </div>
      <div className="flex py-2 items-center justify-between">
        <div className="flex gap-1">
          <FilterDropdown setQueries={setQueries} />
        </div>
        <Link to="/add-wing" className="bg-pink-600 flex py-[4px] px-4 items-center gap-3 rounded-lg cursor-pointer">
          <AiOutlinePlus />
          <h1>Add New</h1>
        </Link>
      </div>

      <WingContent
        queries={queries}
      />

    </section>
  );
};

export default Wings;