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

const InquiryList = ({ user, updatedRfqData, filterRfqData, isLoading }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [userDetails] = User((store) => [store.userDetails]);

  // console.log('userdetails',updatedRfqData);

  const onClose = () => {
    setShowFilter(false);
  };
  const showDrawer = () => {
    setShowFilter(!showFilter);
  };
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
        <AllInquiry
          user={user}
          updatedRfqData={updatedRfqData}
          filterRfqData={filterRfqData}
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default InquiryList;
