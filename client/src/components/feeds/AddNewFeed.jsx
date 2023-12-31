import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgFeed } from "react-icons/cg";
import formStyles from "../../constants/styles/styles";
import { useNavigate } from "react-router-dom";
import { createFeed } from '../../redux/slices/feedSlice';

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";


export default function AddNewAnnouncement() {
  const [tags, setTags] = useState('sde');
  const [fields, setFields] = useState(false);

  const descRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if ( !tags || !descRef.current.value ){
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 3000);
    } else {
      dispatch(
        createFeed({
          feedDetails: descRef.current.value,
          tags,
        })
      );
      navigate("/feeds")
    }
  };
  return (
    <section className={formStyles.sectionStyle}>
      <div className="py-2 text-pink-600">
        <h1 className="text-5xl font-bold  max-xl:text-4xl max-xs:text-3xl">New Feed</h1>
      </div>
      {fields && <p className="text-center text-lg text-red-500 font-semibold mt-4">Fill all the fields</p>}
      <div className="flex flex-col w-full my-5">
        <p className="mb-2">WING</p>
        <div className="flex w-full justify-between">
          <select
            placeholder="Event wing..."
            className={formStyles.eventTypeSelectInputStyle}
            onChange={(e)=>setTags(e.target.value)}
          >
            <option className="text-black" value='sde'>Software development</option>
            <option className="text-black" value='cp'>Competetive programming</option>
            <option className="text-black" value='ai/ml'>Machine learning and artificial intelligence</option>
            <option className="text-black" value='cybersecurity'>Cybersecurity</option>
            <option className="text-black" value='blockchain'>Blockchain</option>
            <option className="text-black" value='robotics'>Robotics</option>
            <option className="text-black" value='iot'>Internet of things</option>
            <option className="text-black"  value='electronics'>Core electronics</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-2">DESCRIPTION</p>
        <div>
          <textarea
            rows={4}
            ref={descRef}
            className={formStyles.textareaStyle}
            placeholder="Enter feed details..."
          />
        </div>
      </div>
      <div className="flex gap-3 justify-center mt-5">
        <button
          onClick={() => navigate("/feeds")}
          type="button"
          className={formStyles.btn2}
        >
          <AiOutlineArrowLeft /> Go Back
        </button>

        <button type="button" className={formStyles.btn3} onClick={handleClick}>Create Feed <CgFeed /></button>
      </div>
    </section>
  );
}
