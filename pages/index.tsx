import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

interface Card {
  name: string,
  image: string,
  link: string,
}

const Cards: Card[]=[
  {
    name:"تسک 1",
    link:"taskone",
    image: "https://picsum.photos/200/300"
  },
  // {
  //   name:"تسک 2",
  //   link:"tasktwo",
  //   image: "https://picsum.photos/200/300"
  // },
  // {
  //   name:"تسک 3",
  //   link:"taskthree",
  //   image: "https://picsum.photos/200/300"
  // },
]

const Home: NextPage = () => {

  const router = useRouter();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-10" dir="rtl">
      <Head>
        <title>فربد شعبانی</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className=" flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className=" text-2xl font-bold mb-20 md:text-6xl ">
            تسک های <span className="text-blue-600">فربد شعبانی</span>
          </h1>

          <div className="flex flex-col w-full h-120 item-center justify-center mt-2 overflow-scroll  md:flex-row md:overflow-visible">
            {Cards.map((card: Card, index) => (
              <div className="hover:shadow-xl h-1/4 md:h-80  shadow-md flex flex-col items-center justify-start basis-0  md:basis-1/3 mt-20 md:mx-5 rounded-lg" key={index} onClick={()=> router.push(card.link)}>
                <Image className="overflow-hidden w-11/12 h-1/2 rounded-md mb-2" width={0} height={0} src={card.image} alt={card.name} />
                <h2 className="font-bold text-lg mt-10">
                {card.name}
                </h2>
                </div>
            ))}
          </div>

        </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
