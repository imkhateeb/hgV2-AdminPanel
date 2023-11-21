function haveCommonElement(array1, array2) {
   // return array1.some(element => array2.includes(element));

   // current logic
   const tagStr = array1[0];
   return array2?.some(element => tagStr?.toLowerCase().includes(element.toLowerCase()));
}

export const filterAnnouncements = (announcementData, searchTerm, queries) => {
  let newArray;
   if ( searchTerm?.trim() ){
      newArray = announcementData?.filter((announcement) => (announcement?.announcementDetails.toLowerCase().includes(searchTerm?.toLowerCase()) || announcement?.user.name.toLowerCase().includes(searchTerm?.toLowerCase())));
   } else {
      newArray = announcementData && announcementData;
   }
      
   let finalArray;
   if (queries?.length) {

      finalArray = newArray?.filter(item => haveCommonElement(item?.tags, queries));

   } else {
      finalArray = newArray;
   }

   
   return finalArray;
}
