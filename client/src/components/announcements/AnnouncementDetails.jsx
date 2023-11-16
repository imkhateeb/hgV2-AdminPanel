import React from 'react'

export default function AnnouncementDetails({ data, setAnnouncementDetailPopUp }) {
   console.log(data);
   return (
      <div className="w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/3 bg-bgSecondary rounded-3xl p-5 z-20">
         <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{data?.user?.name}</h1>
            <p className='text-gray-400 mt-1'>{data.createdAt.split("T")[0]} {" "} {data.createdAt.split("T")[1].split(".")[0]}</p>
            <p className='my-4'>{data.announcementDetails}</p>
         </div>
         <div className="z-20 opacity-100 flex gap-3">
            {/* <button
               type="button"
               className="py-1 px-3 rounded-md cursor-pointer bg-pink-600 hover:bg-pink-500 text-white transition-all duration-200 ease-linear"

            >Save</button> */}
            <button
               type="button"
               className="py-1 px-3 rounded-md cursor-pointer bg-bgSecondary hover:bg-bgTertiary text-white transition-all duration-200 ease-linear"
               onClick={() => setAnnouncementDetailPopUp(false)}
            >Cancel</button>
         </div>
      </div>
   )
}
