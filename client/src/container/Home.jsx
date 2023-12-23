import { Route, Routes } from "react-router-dom";
import {
  Sidebar,
  Navbar,
  Assignments,
  AddNewFeed,
  AddNewAnnouncement,
  AddNewWing,
} from "../components";

import ProtectedRoute from "../components/authentication/ProtectedRoutes";

import Wings from "./Wings";
import Announcements from "./Announcements";
import Feeds from "./Feeds";
import Levels from "./Levels";
import AddNewLevel from "../components/levels/AddNewLevel";
import SubTopics from "./SubTopics";
import AddNewSubTopic from "../components/subtopics/AddNewSubTopic";

export default function Home() {
  return (
    <>
      <div className="flex gap-3 w-full min-h-screen bg-bgTertiary text-white p-3 max-md:p-2">
        <div className="max-md:hidden">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Navbar />
          {/* <ProtectedRoute> */}
            <Routes>
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/feeds" element={<Feeds />} />
              <Route path="/wings" element={<Wings />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/add-feed" element={<AddNewFeed />} />
              <Route path="/add-wing" element={<AddNewWing />} />
              <Route path="/add-level" element={<AddNewLevel />} />
              <Route path="/add-subtopic" element={<AddNewSubTopic />} />
              <Route path="/levels" element={<Levels />} />
              <Route path="/subtopics" element={<SubTopics />} />
              <Route
                path="/add-announcement"
                element={<AddNewAnnouncement />}
              />
            </Routes>
          {/* </ProtectedRoute> */}
        </div>
      </div>
    </>
  );
}
