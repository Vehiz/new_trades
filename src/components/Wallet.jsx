import { useState } from 'react'
import WalletSvg from './WalletSvg.jsx'
import { accordionItems } from '../utils/AccordionItems.jsx'
import Carousel from './Carousel.jsx';

const Wallet = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index)=>{
    setActiveIndex(index === activeIndex ? null : index);
  }


  return (
    <div className="max-w-[80rem] px-4 md:px-10 mx-auto">
      <section className="text-customColor flex flex-col md:grid md:grid-cols-2 bg-walletColor bg-375px bg-top-right-180px rounded-[1.25rem] md:rounded-3xl bg-wallet-image bg-no-repeat md:bg-625px md:bg-right-bottom-2.5rem my-[3.8rem] p-4 min-h-[52.5rem]  ">
        <div className="text-walletText flex justify-start md:py-[70px] flex-col md:pl-[8.8rem] py-0 ">
          <div className="inline-flex rounded-3xl place-items-center mb-5 p-3 md:p-4 bg-walletOther self-start ">
            <WalletSvg />
            <p className="text-[18px] leading-6 ml-[10px] font-[500] capitalize">
              wallet
            </p>
          </div>
          <h2 className=" m-0 md:mb-[1.875rem] max-w-[30.5rem] text-[1.25rem] md:text-[2.5rem] font-[600] leading-[1.75rem] md:leading-[3.25rem] ">
            The only crypto wallet you’ll ever need
          </h2>
          <div className="hidden md:flex flex-col  mb-[1.8rem] max-w-[30.5rem]">
            {/*ACCORDION  */}

            {accordionItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className={` mb-3 rounded-xl border border-walletBorder cursor-pointer ${
                    activeIndex === index ? 'bg-walletActive' : 'bg-walletOther'
                  }`}
                  onClick={() => handleAccordionClick(index)}
                >
                  <h3
                    className={`text-walletText py-4 px-5 text-[1rem] font-[500] leading-5 transition-all ease-in-out 
                    `}
                  >
                    {item.title}
                  </h3>
                  {activeIndex === index && (
                    <p className="text-walletText max-w-[80%] overflow-hidden px-[1.25rem]  pb-[1rem] text-[1rem] font-[400] leading-[1.5rem] transition-all">
                      {item.content}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          {/*CAROUSEL CONTAINER*/}

          <div className="md:hidden">
            <Carousel
              data={accordionItems}
            />
          </div>

          <a className="inline-flex justify-center py-[0.6rem] px-[0.875rem] md:py-[0.8rem] md:px-[1.4rem] text-[0.875rem] md:text-lg font-[500] rounded-lg text-nowrap bg-walletText text-white w-fit-content mt-7 md:mt-[5rem] items-center tracking-wide leading-[143%] md:leading-[144%] cursor-pointer border-[0.125rem] border-transparent ">
            Get Started
          </a>
        </div>

        {/*IMAGE CONTAINER*/}
        <div className="hidden md:flex flex-col pl-[5rem] justify-center">
          {activeIndex !== null && (
            <div className="h-[100%] w-[100%] flex items-center justify-center">
              <img
                src={accordionItems[activeIndex].image}
                alt="Accordion related"
                className="rounded-lg w-[422px] h-[690px]"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Wallet