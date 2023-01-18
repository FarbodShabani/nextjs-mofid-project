import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Coin, getCoins } from "./api/taskone";
import { AxiosResponse } from "axios";

type TableTr = [string, string, string, string, string, string, string, string];

const tableHeadClassName: string =
  "h-fit  font-medium pb-0 px-4 pt-1 text-slate-400 uppercase";

const tableHeads: TableTr = [
  "#",
  "coins",
  "price",
  "24",
  "7d",
  "market cap",
  "total volume",
  "circulating supply",
];

export async function getStaticProps() {
  try {
    const {data}: any = await getCoins(1);

    // console.log("coins", data);
    

    return { props: { coins: null } };
  } catch (error) {
    console.log("error", error);

    return { props: { coins: null, filters: null } };
  }
}

const TaskOne = ({ coins, filters }: any) => {
  const [page, setPage] = useState(1); // max 25
  const {
    data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["coins", page],
    queryFn: () => getCoins(page),
    initialData: coins,
  });

  const onChangeInput = (value: number):void => {
    if (value > 1 && value < 25) {
      setPage(value)
    }
  }
  

  if (isLoading) {
    return <>please wait</>;
  }

  if (isError) {
    return (
      <>
        check console for checking error If there was problem from fetching data
        simply refresh the page again
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <table className="border-collapse table-fix p-4.5 px-4 text-sm w-4/5 bg-slate-900 rounded-2xl">
        <thead>
          <tr>
            {tableHeads.map((tableHead: string, index: number) => (
              <th
                className={
                  tableHeadClassName +
                  `${index < 2 ? " text-left" : " text-right"}`
                }
                key={index}
              >
                {tableHead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            data.coins.map((coin: Coin, index: number) => (
              <tr
                className={`px-4 ${
                  index !== 9 && "border-b-2 border-b-slate-600"
                } h-14`}
                key={coin.id}
              >
                <td className="text-slate-600 pl-4">
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="flex flex-row items-center justify-start">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    className="w-1/12 "
                    width={1}
                    height={1}
                  />
                  <div className="flex flex-col ml-2 items-start justify-center w-5/6 h-full">
                    <span className="text-left text-slate-100 capitalize font-semibold">
                      {coin.name}
                    </span>
                    <span className="text-left text-slate-400">
                      {coin.symbol}
                    </span>
                  </div>
                </td>
                <td className="text-right text-slate-100">
                  ${coin.current_price}
                </td>
                {coin.price_change_percentage_24h > 0 ? (
                  <td className="text-right text-green-600">
                    ^ {coin.price_change_percentage_24h.toFixed(2)} %
                  </td>
                ) : (
                  <td className="text-right text-red-600">
                    v {coin.price_change_percentage_24h.toFixed(2)} %
                  </td>
                )}
                {coin.price_change_percentage_7d_in_currency > 0 ? (
                  <td className="text-right text-green-600">
                    ^ {coin.price_change_percentage_7d_in_currency.toFixed(2)} %
                  </td>
                ) : (
                  <td className="text-right text-red-600">
                    v {coin.price_change_percentage_7d_in_currency.toFixed(2)} %
                  </td>
                )}
                <td className="text-right text-slate-100">
                  {coin.market_cap
                    ? "$" + coin.market_cap
                    : "don't have any for now"}
                </td>
                <td className="text-right text-slate-100">
                  {coin.fully_diluted_valuation
                    ? "$" + coin.fully_diluted_valuation
                    : "don't have any for now"}
                </td>
                <td className="text-right text-slate-100 pr-4">
                  {coin.max_supply
                    ? coin.max_supply
                    : "don't have any right now"}{" "}
                  <span className="text-left text-slate-600 uppercase">
                    {coin.max_supply && coin.symbol}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex w-full h-20 items-center justify-evenly mt-5 text-white">
        <div className="flex flex-row items-center justify-center w-1/6 h-full ">
          <button
            type="button"
            disabled={page === 1}
            className="font-bold rounded-xl bg-slate-900 text-lg w-1/4 h-2/3"
            onClick={() => setPage(page - 1)}
          >
            {"<"}
          </button>
          <input
            type="number"
            max={25}
            min={1}
            className="border w-1/4 h-2/3 mx-2 text-black text-center"
            value={page}
            onChange={(e) => onChangeInput(parseInt(e.target.value))}
          />
          <button
            type="button"
            disabled={page === 25}
            className="font-bold rounded-xl bg-slate-900 text-lg w-1/4 h-2/3"
            onClick={() => setPage(page + 1)}
          >
            {">"}
          </button>
        </div>


    
      </div>
    </div>
  );
};

export default TaskOne;
