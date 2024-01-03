import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubmissionContent } from "../components";

import { useDispatch, useSelector } from "react-redux";

import FilterDropdown from "../components/utility/Filter";


const Submissions = () => {
   const [queries, setQueries] = useState([]);
   const [assignmentData, setAssignmentData] = useState(null);
   const { assignmentId } = useParams();



   return (
      <section className="bg-bgSecondary rounded-3xl p-5 w-full">
         <div className="w-full flex items-center my-2">
            <h1 className="text-white text-3xl font-bold">{assignmentData ? assignmentData.name + " - Submissions" : "Submissions"}</h1>
         </div>
         <div className="flex py-2 items-center justify-between">
            <div className="flex gap-1">
               <FilterDropdown
                  setQueries={setQueries}
               />
            </div>
         </div>

         <div className="overflow-auto w-full">
         <SubmissionContent
            queries={queries}
            assignmentId={assignmentId}
            setAssignmentData={setAssignmentData}
         />

         </div>
      </section>
   );
};

export default Submissions;