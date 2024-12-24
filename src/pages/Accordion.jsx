import { useState, useRef } from "react";
import { Collapse } from "react-collapse";
import BTC from "../assets/BTC.svg";
import Ethereum from "../assets/ETH.svg";
import USDT from "../assets/USDT.svg";
import PropTypes from "prop-types";

const Accordion = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const copyText = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  const data = [
    {
      title: "Bitcoin",
      img: BTC,
    },
    {
      title: "Ethereum",
      img: Ethereum,
    },
    {
      title: "USDT",
      img: USDT,
    },
  ];
  const AccordionItem = ({ open, toggle, title, img }) => {
    return (
      <div className="text-[14px]">
        <div
          className={`flex gap-[8px] w-[100%] px-[10px] py-[15px] bg-[#f4f7fe] font-semibold ${
            open && "bg-[blue] text-[#fff]"
          } mb-[10px] rounded-[5px] items-start cursor-pointer`}
          onClick={toggle}
        >
          <div>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
        </div>
        <Collapse isOpened={open}>
          <div className={`flex gap-[5px] mb-[8px]`}>
            <div className="w-full">
              <input
                className="w-full bg-[#f4f7fe] rounded-[5px] p-[10px] text-[14px] text-[#1E1E1E] "
                type="text"
                ref={inputRef}
                defaultValue={`${title === "Bitcoin" ? "bc1qltte53n9000w4e54gufutr8260t22mzxwcmw93" : "0x885746a14b370D4FE3AbEb2D94d5936a4ce311fE"}`}
              />
            </div>
            
            <button
              className="bg-[#d66b15] text-white px-[23px] py-[5px] rounded"
              onClick={copyText}
            >
              copy
            </button>
          </div>
          {copied && <div className="text-green-500">Copied to clipboard!</div>}
        </Collapse>
      </div>
    );
  };
  AccordionItem.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  };
  return (
    <div>
      <div>
        {data.map((data, index) => {
          return (
            <AccordionItem
              className="flex"
              key={index}
              open={open === index}
              toggle={() => toggle(index)}
              title={data.title}
              img={data.img}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
