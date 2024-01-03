import { Route, Routes } from "react-router-dom";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb"
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
import { useState } from "react";
import IconSidebar from "../components/navigation/sidebar/IconSidebar";

// import ProtectedRoute from "../components/authentication/ProtectedRoutes";
export default function Home() {
  const [expand, setExpand] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className="flex gap-3 w-full min-h-screen  bg-bgTertiary text-white p-3 max-md:p-2 font-poppins">
        <div className="max-lg:hidden">
          <Sidebar
            setExpand={setExpand}
            setOpenSidebar={setOpenSidebar}
            expand={expand}
            openSidebar={openSidebar}
          />
        </div>
        {
          (expand || openSidebar) &&
          <div className="lg:hidden absolute top-3 left-3 max-md:top-2 max-md:left-2 z-50">
            <Sidebar
              setExpand={setExpand}
              setOpenSidebar={setOpenSidebar}
              expand={expand}
              openSidebar={openSidebar}
            />
          </div>
        }
        <div className="lg:hidden max-ss:hidden flex flex-col gap-3">
          <IconSidebar
            setExpand={setExpand}
            setOpenSidebar={setOpenSidebar}
          />
        </div>
        <div className={`flex flex-col gap-3 w-full`}>
          <div className="flex gap-3 items-center">
            <div
              className="bg-bgSecondary p-1 rounded-md cursor-pointer text-pink-600 ss:hidden hover:text-pink-500 transition-all duration-200 ease-linear"
              onClick={() => setOpenSidebar(true)}
            >
              <TbLayoutSidebarLeftExpandFilled
                fontSize={40}
              />
            </div>
            <Navbar />
          </div>
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

            <Route path="/result" element={<ResultFB />} />
          </Routes>
          {/* </ProtectedRoute> */}
        </div>
      </div>
    </>
  );
}