import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addResource } from "../../redux/slices/subTopicSlice";
import feedsStyle from "../../constants/styles/styles";

export default function AddResource({ setAddResource, subtopic }) {
  const dispatch = useDispatch();

  //   const [newLevelTitle, setNewLevelTitle] = useState(level?.title);
  const resourceURL = useRef(null); 
  const resourceType = useRef(null);

  const handleClick = () => {
    const resourceObj = {
      subtopicId: subtopic._id,
      url: resourceURL.current.value,
      type: resourceType.current.value,
    };

    dispatch(addResource(resourceObj));
    setAddResource(false);
  };

  return (
    <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-lg px-5 py-6 z-20">
      <h1 className="text-3xl font-bold">Add Resource</h1>
      <div className="w-full my-4">
        <p className="my-2">URL</p>
        <div className="flex gap-6">
          <div className="flex w-[70%]  justify-between">
            <input
              type="url"
              placeholder="Paste url here..."
              className={feedsStyle.eventTypeInputStyle2}
              ref={resourceURL}
            />
          </div>
          <select
            id="type"
            name="type"
            defaultValue="watch"
            ref={resourceType}
            className={feedsStyle.eventTypeSelectInputStyle}
          >
            <option className="text-black" value="watch">
              Watch
            </option>
            <option className="text-black" value="read">
              Read
            </option>
          </select>
        </div>
      </div>
      <div className="z-20 opacity-100 flex gap-3">
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"
          onClick={handleClick}
        >
          Add
        </button>
        <button
          type="button"
          className="py-1 px-3 rounded-md cursor-pointer bg-slate-800 hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
          onClick={() => setAddResource(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
