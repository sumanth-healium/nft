import { getInfuraURL } from "../../../utils/getIPFSURL";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useHelper from "../../helper/helper";
import { AUCTION_DETAILS } from "../../constants/api_endpoints";
import LineChart from "../charts/LineChart";
import Bids from "./Bids";

function Details() {
  const { makeRequests } = useHelper();
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState<any>({});
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const data = await makeRequests(AUCTION_DETAILS(params.id));
    setData(data.data);
    console.log(data.data.meta);
  };
  useEffect(() => {
    console.log(Object.values(data));
  }, [data]);

  const bids = [
    { price: "2.52 ETH", usd: "22", from: "ram" },
    { price: "3.52 ETH", usd: "32", from: "sam" },
    { price: "5.52 ETH", usd: "52", from: "test" },
    { price: "6.52 ETH", usd: "62", from: "john" },
  ];

  const chart_data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [33, 53, 85, 41, 44, 65],
  };

  const card_details = {
    title : "Bids"
}
  return (
    <>


    <section className="text-white body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap mx-5">
            <div className="p-12 md:w-1/2 flex flex-col items-start">
              {Object.values(data).length != 0 && (
                <img
                  alt="ecommerce"
                  className="w-full sm:h-auto md:h-[25rem] object-center  rounded"
                  src={getInfuraURL(data?.meta?.thumbnail)}
                />
              )}

              <div className="py-5 w-[100%]">
                {/* <Bids w_percentage={"100"} bids={bids} /> */}
                <div className={`overflow-hidden border shadow sm:rounded-lg md:w-[100%] sm:w-auto`}>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6">{location.pathname.includes("auction")?"Bids":"Offers"}</h3>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="px-4 py-5 grid grid-cols-3 gap-4 px-6 text-center">
                    <dt className="text-xs text-gray-500">Price</dt>
                    <dt className="text-xs text-gray-500">USD Price</dt>
                    <dt className="text-xs text-gray-500">Price</dt>
                  </div>
                  {bids?.map((val: any, index: any) => (
                    <div
                      className={` ${
                        index != 0 && "border-t"
                      } px-4 py-4  grid grid-cols-3 gap-4 px-6 text-center`}
                    >
                      <dt className="text-sm font-medium text-white">
                        {val.price}
                      </dt>
                      <dt className="text-sm font-medium text-gray-500">
                        {val.usd}
                      </dt>
                      <dt className="text-sm font-medium text-white">
                        {val.from}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
              </div>

            </div>

            <div className="p-12 md:w-1/2 flex flex-col items-start">
              <h2 className="font-Montserrat text-[24px] font-extrabold">
                {data?.meta?.name}
              </h2>
              <div className="h-2"></div>
              <p className="font-Montserrat text-[16px] font-extralight">
                Author{" "}
                <span className="font-extrabold">{data?.owner?.name}</span>
              </p>
              <div className="h-4"></div>
              <p className="font-light">{data?.meta?.description}</p>

              <div className="py-8 w-[100%]">
                <div className="mx-auto">
                  <dl className="mt-5 text-center grid grid-cols-1 rounded-2xl border overflow-hidden shadow md:grid-cols-3 items-center">
                    <div className="md:px-4 md:py-5 sm:p-6">
                      <dt className="font-semibold text-center text-2xl">
                        <div>
                          <p className="text-center text-xl whitespace-nowrap">Auction Ends In</p>
                        </div>
                      </dt>
                      <dt className="text-base hover:cursor-pointer font-normal whitespace-nowrap text-gray-400">
                      {data?.auction?.deadline}
                      </dt>
                    </div>
                    <div>
                      <p className="text-3xl">/</p>
                    </div>
                    <div className="md:px-4 md:py-5 sm:p-6">
                      <dt className="font-semibold text-center text-xl">
                        <div>
                          <p className="text-center text-xl whitespace-nowrap">Last Bid</p>
                        </div>
                      </dt>
                      <dt className="text-base font-normal text-gray-400 whitespace-nowrap">
                      {data?.auction?.highestBid} ETH
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="w-[100%] border dark:border-blue-500 flex items-center justify-between rounded-lg text-gray-400">
                  <h4 className="px-5 w-[100%]">
                    {" "}
                    Minimum bid {data?.auction?.minBid} ETH
                  </h4>
                  <button className="cursor-pointer w-[50%] border-blue-600 border bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-5 rounded-lg text-center text-white">
                    Place Bid
                  </button>
                </div>

              <div className="py-16 w-[100%]">
              <LineChart className="py-6" w_percentage={"100"} chart_data={chart_data} />
              </div>
            </div>
          </div>
         

        </div>
      </section>
      {/* {Object.values(data).length != 0 && (
        <>
          <div className="flex lg:flex-row md:flex-row gap-20 m-3 mt-20 lg:mx-32 md:mx-32 relative sm:flex-col xs:flex-col z-[-1]">
            <div className="sm:w-auto lg:w-[50%] md:w-[50%] z-1000 rounded-lg">
                  <img
                    src={getInfuraURL(data?.meta?.thumbnail)}
                    alt="img"
                    className="w-[100%] h-[33rem] rounded-lg"
                  />
                  </div>
            <div className="sm:w-auto lg:w-[50%] md:w-[50%]">
              <h2 className="font-Montserrat text-[24px] font-extrabold">
                {data?.meta?.name}
              </h2>
              <div className="h-2"></div>
              <p className="font-Montserrat text-[16px] font-extralight">
                Author{" "}
                <span className="font-extrabold">{data?.owner?.name}</span>
              </p>
              <div className="h-4"></div>
              <p className="font-light">{data?.meta?.description}</p>

              {location.pathname.includes("auction") && (
                <div className="py-12">
                  <div className="mx-auto">
                    <dl className="mt-5 text-center grid grid-cols-1 rounded-2xl border overflow-hidden shadow md:grid-cols-3 items-center">
                      <div className="md:px-4 md:py-5 sm:p-6">
                        <dt className="font-semibold text-center text-2xl">
                          <div>
                            <p className="text-center text-xl whitespace-nowrap">
                              Auction Ends In
                            </p>
                          </div>
                        </dt>
                        <dt className="text-base font-normal text-gray-400">
                          {data?.auction?.deadline}
                        </dt>
                      </div>
                      <div>
                        <p className="text-3xl">/</p>
                      </div>
                      <div className="md:px-4 md:py-5 sm:p-6">
                        <dt className="font-semibold text-center text-xl">
                          <div>
                            <p className="text-center text-xl">Last Bid</p>
                          </div>
                        </dt>
                        <dt className="text-base font-normal text-gray-400">
                          {data?.auction?.highestBid} ETH
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {location.pathname.includes("sales") && (
                <div className="py-12">
                  <div className="mx-auto">
                    <dl className="mt-5 text-center grid grid-cols-1 rounded-2xl border overflow-hidden shadow md:grid-cols-3 items-center">
                      <div className="md:px-4 md:py-5 sm:p-6">
                        <dt className="font-semibold text-center text-2xl">
                          <div>
                            <p className="text-center text-xl">Collection</p>
                          </div>
                        </dt>
                        <dt className="text-base font-normal text-gray-400">
                          {data?.collection?.name}
                        </dt>
                      </div>
                      <div>
                        <p className="text-3xl">/</p>
                      </div>
                      <div className="md:px-4 md:py-5 sm:p-6">
                        <dt className="font-semibold text-center text-xl">
                          <div>
                            <p className="text-center text-xl">Price</p>
                          </div>
                        </dt>
                        <dt className="text-base font-normal text-gray-400">
                          {data?.sale?.price} ETH
                        </dt>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {location.pathname.includes("auction") && (
                <div className="border dark:border-blue-500 flex items-center justify-between rounded-lg text-gray-400">
                  <h4 className="px-5">
                    {" "}
                    Minimum bid {data?.auction?.minBid} ETH
                  </h4>
                  <button className="cursor-pointer w-[50%] border-blue-600 border bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-5 rounded-lg text-center text-white">
                    Place Bid
                  </button>
                </div>
              )}

              {location.pathname.includes("sales") && (
                <div className="flex gap-10">
                  <button className="cursor-pointer w-[50%] border-blue-600 border bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2 py-5 rounded-lg text-center text-white">
                    Buy for {data?.sale?.price} ETH
                  </button>
                  <button className="cursor-pointer w-[50%] border-blue-600 border  px-2 py-5 rounded-lg text-center text-white">
                    Make an Offer
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex lg:flex-row md:flex-row gap-20 m-3 mt-20 lg:mx-32 md:mx-32 xs:flex-col relative sm:flex-col z-[-1]">
            <Bids className="w-1/2 " bids={bids} />
            <LineChart className="w-1/2" chart_data={chart_data} />
          </div>
        </>
      )} */}
    </>
  );
}

export default Details;
