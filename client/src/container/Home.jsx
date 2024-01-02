import { Route, Routes } from "react-router-dom";
import {
  Sidebar,
  Navbar,
  AddNewFeed,
  AddNewAnnouncement,
  AddNewWing,
  AddNewTopic,
  AddNewAssignment,
  AddNewLevel,
  AddNewSubTopic
} from "../components";

import Announcements from "./Announcements";
import Feeds from "./Feeds";

import Wings from "./Wings";
import Levels from "./Levels";
import Topics from "./Topics";
import Assignments from './Assignments';
import SubTopics from "./SubTopics";
import Submissions from "./Submissions";
import ResultFB from "../components/utility/Result";

// import ProtectedRoute from "../components/authentication/ProtectedRoutes";
export default function Home() {
  return (
    <>
      <div className="flex gap-3 w-full min-h-screen  bg-bgTertiary text-white p-3 max-md:p-2 font-poppins">
        <div className="max-lg:hidden w-[115px]">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-3 w-full lg:pl-[172px]">
          <Navbar />
          {/* <ProtectedRoute> */}
            <Routes>
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/add-announcement" element={<AddNewAnnouncement />} />

              <Route path="/feeds" element={<Feeds />} />
              <Route path="/add-feed" element={<AddNewFeed />} />

              <Route path="/wings" element={<Wings />} />
              <Route path="/add-wing" element={<AddNewWing />} />

              <Route path="/levels/:wingId" element={<Levels />} />
              <Route path="/add-level/:wingId" element={<AddNewLevel />} />

              <Route path="/topics/:levelId" element={<Topics />} />
              <Route path="/add-topic/:levelId" element={<AddNewTopic />} />

              <Route path="/assignments/:levelId" element={<Assignments />} />
              <Route path="/add-assignment/:levelId" element={<AddNewAssignment />} />
              <Route path="/assignment/:assignmentId/submissions" element={<Submissions />} />

              <Route path="/subtopics/:topicId" element={<SubTopics />} />
              <Route path="/add-subtopic/:topicId" element={<AddNewSubTopic />} />

              <Route path="/result" element={<ResultFB/>} />
            </Routes>
          {/* </ProtectedRoute> */}
        </div>
      </div>
    </> 
  );
}