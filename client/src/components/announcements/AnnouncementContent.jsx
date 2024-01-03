// import { useEffect, useState } from "react";
// import Announcement from "./Announcement";
// import { BiSort } from "react-icons/bi";
// import { useSelector, useDispatch } from "react-redux";
// import {fetchAnnouncements} from '../../redux/slices/announcementSlice';
// import SkeletonAnimation from "../utility/SkeletonAnimation";

// import {filterAnnouncements} from "../../utils/filterAnnouncements";


// const AnnouncementContent = ({
//   searchTerm,
//   queries,
//   announcementLimit,
//   setTotalAnnouncements,
//   pageNumber,
//   totalAnnouncements
// }) => {

//   const [announcements, setAnnouncements] = useState([]);
//   const [showOldest, setShowOldest] = useState(false);
//   const [sortByName, setSortByName] = useState(false);
//   const [sortByDesc, setSortByDesc] = useState(false);
//   const [sortByStatus, setSortByStatus] = useState(false);
//   const dispatch = useDispatch();
//   const { announcementData, loading, error } = useSelector((state) => state.announcements);

//   const fetchAllAnnouncements = () => {
//     try {
//       dispatch(fetchAnnouncements());
//     } catch (error) {
//       console.log("Error while gettting all announcements", error);
//     }
//   }

//   useEffect(() => {
//     fetchAllAnnouncements();
//   }, [dispatch]);

//   useEffect(() => {
//     if (announcementData?.length) {
//       if (!searchTerm?.trim() && !queries?.length) {
//         setTotalAnnouncements(announcementData?.length);
//         setAnnouncements(announcementData);
//       } else {
//         const filteredAnnouncements = filterAnnouncements(announcementData, searchTerm, queries);
//         setTotalAnnouncements(filteredAnnouncements?.length);
//         setAnnouncements(filteredAnnouncements);
//       }
//     }
//   }, [announcementData, searchTerm, queries]);



//   const handleSortByTimeDate = () => {
//     if (showOldest) {
//       setAnnouncements([...announcements].sort((a, b) => {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }));
//     } else {
//       setAnnouncements([...announcements].sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       }))
//     }
//   }

//   const handleSortByLexicalUser = () => {
//     if (sortByName) {
//       setAnnouncements([...announcements].sort((a, b) => {
//         let nameA = a.user.name.toUpperCase();
//         let nameB = b.user.name.toUpperCase();
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }
//         return 0;
//       }))
//     } else {
//       setAnnouncements([...announcements].sort((a, b) => {
//         let nameA = a.user.name.toUpperCase();
//         let nameB = b.user.name.toUpperCase();
//         if (nameA < nameB) {
//           return 1;
//         }
//         if (nameA > nameB) {
//           return -1;
//         }
//         return 0;
//       }))
//     }
//   }

//   const handleSortByLexicalDesc = () => {
//     if (sortByDesc) {
//       setAnnouncements([...announcements].sort((a, b) => {
//         let descA = a.announcementDetails.toUpperCase();
//         let descB = b.announcementDetails.toUpperCase();
//         if (descA < descB) {
//           return -1;
//         }
//         if (descA > descB) {
//           return 1;
//         }
//         return 0;
//       }))
//     } else {
//       setAnnouncements([...announcements].sort((a, b) => {
//         let descA = a.announcementDetails.toUpperCase();
//         let descB = b.announcementDetails.toUpperCase();
//         if (descA < descB) {
//           return 1;
//         }
//         if (descA > descB) {
//           return -1;
//         }
//         return 0;
//       }))
//     }
//   }

//   const handleSortByStatus = () => {
//     if (sortByStatus) {
//       setAnnouncements([...announcements].sort((a, b) => {
//         if (a.status && !b.status) {
//           return -1;
//         }
//         if (!a.status && b.status) {
//           return 1;
//         }
//       }))
//     } else {
//       setAnnouncements([...announcements].sort((a, b) => {
//         if (a.status && !b.status) {
//           return 1;
//         }
//         if (!a.status && b.status) {
//           return -1;
//         }
//       }))
//     }
//   }

//   if (error) return <p>Error loading feeds: {error.message || 'Unknown error'}</p>;

//   return (
//     <div className="flex flex-col w-full mt-4">
//       <div className="flex border-t-[1px] py-5 w-full">
//         <div className="w-[15%] text-[14px] pl-5 font-semibold flex items-center gap-1">USER
//           <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
//             setSortByName(!sortByName);
//             handleSortByLexicalUser();
//           }} />
//         </div>
//         <div className="w-[50%] text-[14px] pl-5 font-semibold flex items-center gap-1">DESCRIPTION
//           <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
//             setSortByDesc(!sortByDesc)
//             handleSortByLexicalDesc()
//           }} />
//         </div>
//         <div className="w-[15%] flex relative gap-1 items-center text-[14px] pl-5 font-semibold">
//           <h1>CREATED ON</h1>
//           <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
//             setShowOldest(!showOldest)
//             handleSortByTimeDate()
//           }} />
//         </div>
//         <div className="w-[10%] text-center text-[14px] pl-5 font-semibold flex items-center gap-1">STATUS
//           <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
//             setSortByStatus(!sortByStatus)
//             handleSortByStatus()
//           }} />
//         </div>
//         <div className="w-[10%] text-center text-[14px] pl-5 font-semibold">ACTION</div>
//       </div>
//       {
//         loading && !announcementData ? <SkeletonAnimation totalAnnouncements={totalAnnouncements} /> :
//           (announcements && announcements.slice(announcementLimit * (pageNumber - 1), announcementLimit * pageNumber > announcements?.length ? announcements?.length : announcementLimit * pageNumber).map((announcement, index) => {
//             return (
//               <Announcement
//                 key={announcement?.announcementDetails + index}
//                 announcement={announcement}
//               />
//             )
//           }))
//       }
//     </div>
//   );
// };

// export default AnnouncementContent;


import { useEffect, useState } from "react";
import Announcement from "./Announcement";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {fetchAnnouncements} from '../../redux/slices/announcementSlice';
import SkeletonAnimation from "../utility/SkeletonAnimation";

import {filterAnnouncements} from "../../utils/filterAnnouncements";


const AnnouncementContent = ({
  searchTerm,
  queries,
  announcementLimit,
  setTotalAnnouncements,
  pageNumber,
  totalAnnouncements
}) => {

  const [announcements, setAnnouncements] = useState([]);
  const [showOldest, setShowOldest] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(false);
  const dispatch = useDispatch();
  const { announcementData, loading, error } = useSelector((state) => state.announcements);

  const fetchAllAnnouncements = () => {
    try {
      dispatch(fetchAnnouncements());
    } catch (error) {
      console.log("Error while gettting all announcements", error);
    }
  }

  useEffect(() => {
    fetchAllAnnouncements();
  }, [dispatch]);

  useEffect(() => {
    if (announcementData?.length) {
      if (!searchTerm?.trim() && !queries?.length) {
        setTotalAnnouncements(announcementData?.length);
        setAnnouncements(announcementData);
      } else {
        const filteredAnnouncements = filterAnnouncements(announcementData, searchTerm, queries);
        setTotalAnnouncements(filteredAnnouncements?.length);
        setAnnouncements(filteredAnnouncements);
      }
    }
  }, [announcementData, searchTerm, queries]);



  const handleSortByTimeDate = () => {
    if (showOldest) {
      setAnnouncements([...announcements].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }));
    } else {
      setAnnouncements([...announcements].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }))
    }
  }

  const handleSortByLexicalUser = () => {
    if (sortByName) {
      setAnnouncements([...announcements].sort((a, b) => {
        let nameA = a.user.name.toUpperCase();
        let nameB = b.user.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }))
    } else {
      setAnnouncements([...announcements].sort((a, b) => {
        let nameA = a.user.name.toUpperCase();
        let nameB = b.user.name.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }))
    }
  }

  const handleSortByLexicalDesc = () => {
    if (sortByDesc) {
      setAnnouncements([...announcements].sort((a, b) => {
        let descA = a.announcementDetails.toUpperCase();
        let descB = b.announcementDetails.toUpperCase();
        if (descA < descB) {
          return -1;
        }
        if (descA > descB) {
          return 1;
        }
        return 0;
      }))
    } else {
      setAnnouncements([...announcements].sort((a, b) => {
        let descA = a.announcementDetails.toUpperCase();
        let descB = b.announcementDetails.toUpperCase();
        if (descA < descB) {
          return 1;
        }
        if (descA > descB) {
          return -1;
        }
        return 0;
      }))
    }
  }

  const handleSortByStatus = () => {
    if (sortByStatus) {
      setAnnouncements([...announcements].sort((a, b) => {
        if (a.status && !b.status) {
          return -1;
        }
        if (!a.status && b.status) {
          return 1;
        }
      }))
    } else {
      setAnnouncements([...announcements].sort((a, b) => {
        if (a.status && !b.status) {
          return 1;
        }
        if (!a.status && b.status) {
          return -1;
        }
      }))
    }
  }

  if (error) return <p>Error loading feeds: {error.message || 'Unknown error'}</p>;

  return (
    <div className="flex flex-col min-w-[680px]  mt-4">
      <div className="flex border-t-[1px] py-5 w-full">
        <div className="max-res:w-[30%] w-[15%] text-[14px] pl-5 font-semibold flex items-center gap-1">USER
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByName(!sortByName);
            handleSortByLexicalUser();
          }} />
        </div>
        <div className="w-[50%] max-res:hidden text-[14px] pl-5 font-semibold flex items-center gap-1">DESCRIPTION
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setSortByDesc(!sortByDesc)
            handleSortByLexicalDesc()
          }} />
        </div>
        <div className="max-res:w-[30%] w-[15%] flex relative gap-1 items-center text-[14px] pl-5 font-semibold">
          <h1>CREATED ON</h1>
          <BiSort className="cursor-pointer hover:shadow-inner hover:shadow-pink-600" onClick={() => {
            setShowOldest(!showOldest)
            handleSortByTimeDate()
          }} />
        </div>
        <div className="max-res:w-[20%] w-[10%] text-center text-[14px] pl-5 font-semibold flex items-center gap-1">STATUS
        </div>
        <div className="max-res:w-[20%] w-[10%] text-center text-[14px] pl-5 font-semibold flex items-center gap-1">ACTION</div>
      </div>
      {
        loading && !announcementData ? <SkeletonAnimation totalAnnouncements={totalAnnouncements} /> :
          (announcements && announcements.slice(announcementLimit * (pageNumber - 1), announcementLimit * pageNumber > announcements?.length ? announcements?.length : announcementLimit * pageNumber).map((announcement, index) => {
            return (
              <Announcement
                key={announcement?.announcementDetails + index}
                announcement={announcement}
              />
            )
          }))
      }
    </div>
  );
};

export default AnnouncementContent;


