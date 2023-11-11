import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { GrAnnounce } from 'react-icons/gr';
import feedsStyle from '../../constants/styles/feedsStyle';

export default function AddNewAnnouncement() {
  return (
    <section className={feedsStyle.sectionStyle}>
      <div className='py-10 px-16 bg-pink-600 rounded-3xl'>
        <h1 className='text-5xl font-bold'>Announcement</h1>
      </div>
      <p className='my-5'>DETAILS</p>
      <div className='flex w-full justify-between'>
        <input
          placeholder='Event type...'
          className={feedsStyle.eventTypeInputStyle}
        />
        <button
          type='button'
          className={feedsStyle.btn1}
        >Set Activities <AiOutlineArrowRight /></button>
      </div>
      <p className='my-5'>DESCRIPTION</p>
      <div>
        <textarea
          rows={4}
          className={feedsStyle.textareaStyle}
          placeholder='Enter details'
        />
      </div>
      <div className='flex gap-3 justify-center mt-5'>
        <button
        type='button'
        className={feedsStyle.btn2}
        ><AiOutlineArrowLeft /> Go Back</button>

        <button
        type='button'
        className={feedsStyle.btn3}
        >Create Announcement <GrAnnounce /></button>
      </div>
    </section>
  )
}