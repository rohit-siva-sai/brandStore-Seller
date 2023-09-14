import React from "react";

import Order from "./adminDetails/order";
import UnitPrice from "./adminDetails/unitPrice";
import ValidTo from "../rfq/productInfo/validTo";
import Destination from "./adminDetails/message/destination";
import Require from "./adminDetails/message/require";
import { Seller } from "@/useStore/seller";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Progress } from "antd";
import { Toaster, toast } from "react-hot-toast";

const Admin = ({ id }) => {
  const [order, unitPrice, requirements, progress] = Seller((store) => [
    store.order,
    store.unitPrice,
    store.requirements,
    store.progress,
    store.scoreInquiry,
  ]);
  const quotationsCollection = collection(db, "quotations");

  const submitNewQuotation = async () => {
    try {
      await setDoc(doc(quotationsCollection), {
        order: order,
        unitPrice: unitPrice,
        requirements: requirements,

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
    } catch (err) {
      console.log(err, "rohitk skvsman ");
    }
  };
  console.log("rohit", order, unitPrice, requirements, progress);
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

  return (
    <div className="w-3/5 px-8 bg-white rounded-xl h-[900px] py-4">
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
        <ValidTo />
        <Require />
        <div
          onClick={() => {
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
