import AllInquiry from "@/components/myRfq/allInquiry";
import Sidebar from "@/components/myRfq/sidebar";
import SimpleSideBar from "@/components/myRfq/simpleSideBar";
import { db } from "@/config/firebase";
import { User } from "@/useStore/user";
import { Drawer } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const InquiryList = ({ user }) => {
  const [showFilter, setShowFilter] = useState(false)
  const [userDetails] = User((store)=>[store.userDetails])
  const [seller,setSeller] = useState("")
   
console.log('userdetails',userDetails);

  const onClose = () => {
    setShowFilter(false);
  };
  const showDrawer = () => {
    setShowFilter(!showFilter)
  };
  const rfqCollection = collection(db, "rfqs");
  const [rfqData, setRfqData] = useState([]);
  const getRfq = async (sellerCategory) => {
    try {
      const data = await getDocs(rfqCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSeller(sellerCategory)
      const rfq = filteredData.filter(
        (item) => item.productCategory[1] == sellerCategory
      );
      setRfqData(rfq);
      console.log("ssassa", rfq);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const sellerCategory = JSON.parse(localStorage.getItem("sellerCategory"))
    console.log('seller',sellerCategory);
    
    getRfq(sellerCategory)
  }, [user]);
  return (
    <div className="md:h-[640px] md:overflow-hidden">
      <div className="flex">
        <div className=" hidden md:block w-1/6">
         
          <SimpleSideBar />
        </div>

        <Drawer
          placement={"left"}
          width={300}
          height={825}
          className=" md:hidden block  "
          open={showFilter}
          onClose={onClose}
        >
          <SimpleSideBar />
        </Drawer>
        <AllInquiry rfqData={rfqData} seller={seller} />
      </div>
    </div>
  );
};

export default InquiryList;
