import React from "react";

import Order from "./adminDetails/order";
import UnitPrice from "./adminDetails/unitPrice";
// import ValidTo from "../rfq/productInfo/validTo";
import Destination from "./adminDetails/message/destination";
import Require from "./adminDetails/message/require";
import { Seller } from "@/useStore/seller";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Progress } from "antd";
import { Toaster, toast } from "react-hot-toast";
import ValidTo from "./adminDetails/validTo";

const Admin = ({ id, rfqData }) => {
  const [order, unitPrice, requirements, progress, quoteDate, updateProgress] =
    Seller((store) => [
      store.order,
      store.unitPrice,
      store.requirements,
      store.progress,
      store.quoteDate,
      store.updateProgress,
      store.scoreInquiry,
    ]);
  const quotationsCollection = collection(db, "quotations");
  const updateRfqQuotes = async (id) => {
    const rfqDoc = doc(db, "rfqs", id);

    await updateDoc(rfqDoc, {
      quotesReceived: rfqData.quotesReceived ? rfqData.quotesReceived + 1 : 1,
    });
    console.log("updated successfully");
  };

  const submitNewQuotation = async () => {
    try {
      await setDoc(doc(quotationsCollection), {
        order: order,
        unitPrice: unitPrice,
        requirements: requirements,
        quoteDate: quoteDate,
        quotationScore: progress,
        rfqId: id,
      });
      
      toast.success("Quotation Successfull", {
        duration: 1000,
        position: "top-center",
        style: {
          background: "black",
          color: "white",
        },
      });
      updateRfqQuotes(id)
    } catch (err) {
      console.log(err, "rohitk skvsman ");
    }
  };
  console.log("rohit", order, unitPrice, requirements, progress);
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

  return (
    <div className="md:w-3/5 w-full px-8 bg-white rounded-xl md:h-[900px] h-[1050px] py-4">
      <Toaster />

      {/* <p className="font-bold text-xl px-6 text-gray-800 mb-4">
        Quotes Received (0 of Maximun 20)
      </p> */}
      <Progress
        percent={progress}
        status="active"
        strokeColor={{ from: "#108ee9", to: "#87d068" }}
      />
      <div className="flex flex-col space-y-4">
        <Order />
        <UnitPrice />
        {/* <ValidTo /> */}
        <ValidTo />
        <Require />
        <div
          onClick={() => {
            updateProgress();
            submitNewQuotation();
          }}
          className="cursor-pointer mt-5 text-base w-fit font-semibold px-7 rounded-md text-white bg-gradient-to-l from-blue-400  to-blue-600 py-2"
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Admin;
