import { Seller } from "@/useStore/seller";
import { Select } from "antd";
import React from "react";
import { useState } from "react";

const Sellercategory = () => {
    const [sellerCategory,updateSellerCategory] = Seller((store)=>[store.sellerCategory,store.updateSellerCategory])
    const [category,setCategory] = useState(sellerCategory)
  return (
    <div className="flex flex-col px-8 space-y-1 w-full">
      <label className="leading-7 text-sm font-semibold text-gray-500">
        Select Seller Category
        <span className="text-red-600 text-lg">*</span>
      </label>
      <Select
        // defaultValue="Bussiness Service"
        value={category}
        placeholder="Select One"
        className="w-full md:w-full text-lg text-gray-600 font-semibold"
        onChange={(value) => {
          setCategory(value)
          
        }}
        onBlur={() => {
          updateSellerCategory(category);
        
        }}
        size="large"
        options={[
          {
            value: "industrial materials",
            label: "industrial materials",
          },
          {
            value: "chemicals",
            label: "chemicals",
          },
          {
            value: "raw materials",
            label: "raw materials",
          },
          
        ]}
      />
    </div>
  );
};

export default Sellercategory;
