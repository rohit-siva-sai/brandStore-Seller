import AllInquiry from '@/components/myRfq/allInquiry'
import Sidebar from '@/components/myRfq/sidebar'
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const InquiryList = ({user}) => {
    const rfqCollection = collection(db, "rfqs");
  const [rfqData, setRfqData] = useState([]);
  const getRfq = async (id) => {
    try {
      const data = await getDocs(rfqCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const rfq = filteredData.filter((item) => item.productCategory[1] ==  "industrial materials" )
      setRfqData(rfq);
      console.log("ssassa", rfq);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getRfq();
  }, [user]);
  return (
    <div className="h-[640px] overflow-hidden">
    <div className="flex">
      <Sidebar />
      <AllInquiry rfqData={rfqData} />
      
    </div>
  </div>
  )
}

export default InquiryList
