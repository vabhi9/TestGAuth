import React from "react";
import Cups from '../../../public/Cups.jpg'

const ProDesc = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center poppins svgBac rounded-3x mb-10">
        <div className="h-[90vh] w-[94vw] flex shadow-2xl shadow-black">
          {/* Section - 1 */}
          <section className="bg-emerald-00 prodBac basis-[45%] flex justify-center items-center rounded overflow-hidden bg-transparen">
            <div
              id="box"
              className="bg-purpe-400 text-white h-[60%] w-[20%] rounded-t-[45%] absolute z-50 "
            >
            <img src={Cups} alt="" className="w-[100%] h-full"/>
            </div>
          </section>
          {/* Section-2 */}
          <section className="basis-[55%] bg-slat-50 flex flex-col justify-around items-start pl-6 bg-slate-100">
            <h3 id="ProductName" className="mt-6 text-3xl font-medium">
              Product Name
            </h3>
            <h2>Yha Pr bhi Kuch daal skte hai</h2>
            <p className="text-2xl font-medium">Price: </p>
            <h1
              id="ProductName"
              className="text-3xl font-semibold w-[80%] text-left mt[-20px]"
            >
              Hii I'm the Product Description of about 3 Lines And I'll Stay
              Here is it Lines
            </h1>
            <div className="h-16 w-[70%] flex flex-col gap-6 justify-center bg-emerad-400">
              <button className="h-[70%] p-2 w-[30%] rounded-3xl hover:scale-110 duration-300 text-lg bg-red-600">
                Buy Now
              </button>
              {/* <button className="h-[70%] p-2 w-[30%] rounded-3xl hover:scale-110 duration-300 text-lg bg-Primary text-white">
              Add to Cart
            </button> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProDesc;
