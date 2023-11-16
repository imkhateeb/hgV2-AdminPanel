function haveCommonElement(array1, array2) {
   // return array1.some(element => array2.includes(element));

   // current logic
   const tagStr = array1[0];
   console.log(tagStr);
   return array2?.some(element => tagStr?.toLowerCase().includes(element.toLowerCase()));
}

export const filterFeeds = (feedData, searchTerm, queries) => {

   let newArray;
   if ( searchTerm?.trim() ){
      newArray = feedData?.filter((feed) => (feed?.feedDetails.toLowerCase().includes(searchTerm?.toLowerCase()) || feed?.name.toLowerCase().includes(searchTerm?.toLowerCase())));
   } else {
      newArray = feedData && feedData;
   }
      
   let finalArray;
   if (queries?.length) {

      finalArray = newArray?.filter(item => haveCommonElement(item.tags, queries));

   } else {
      finalArray = newArray;
   }

   
   return finalArray;
}