import { useEffect } from "react";
import { BiSort } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeeds } from "../../redux/slices/feedSlice";

export default function FeedContent() {
  const dispatch = useDispatch();
  const { feedData, loading, error } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading) return <p>Loading feeds...</p>;
  if (error) return <p>Error loading feeds: {error}</p>;


  const RenderTableRows = () => {
    return feedData.map((feed, index) => {
      console.log(feed);
      (
        <tr key={index}>
          <td>Md Khateebur Rab</td>
          <td>{feed.feedDetails}</td>
          <td>{feed.timestamps}</td>
          <td>{feed.staus}</td>
          <td>{feed.upVotes}</td>
        </tr>
      )
    });
  };

  return (
    <table className="w-full mt-4 overflow-x-scroll">
      <thead className="border-t-2 h-14">
        <tr>
          <th className="text-left w-[20%] text-[15px]">USER</th>
          <th className="text-left w-[40%] text-[15px]">DESCRIPTION</th>
          <th className="text-left w-[20%]">
            <div className="flex items-center gap-2 text-[15px]">
              <h1>CREATED ON</h1>
              <BiSort />
            </div>
          </th>
          <th className="text-left w-[10%] text-[15px]">STATUS</th>
          <th className="text-left w-[10%] text-[15px]">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <RenderTableRows />
      </tbody>
    </table>
  );
}