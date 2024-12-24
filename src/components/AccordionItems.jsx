
import { useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";

const AccordionItems = () => {
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  const accordionData = [
    {
      title: "Is it safe to invest in cryptocurrency?",
      desc: "Cryptocurrency is a good investment if you want to gain direct exposure to the demand for digital currency.",
    },
    {
      title: "When can i withdraw my investment returns?",
      desc: "Investment proceeds can be withdrawn anytime, go to the withdrawal page of the portal to request withdrawal of funds. it's fast, safe and easy.",
    },
    {
      title: "Do i need a special advice to get the most out of this platform?",
      desc: "No, any internet enabled device is good enough to access our trading platform and facilities worldwide.",
    },
  ];

  const AccordionItem2 = ({ open, toggle, title, desc }) => {
    return (
      <div className="pt-[10px]">
        <div
          className="bg-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer"
          onClick={toggle}
        >
          <h2 className="text-[blue] text-[20px] font-semibold">{title}</h2>
          <div className="text-[#1E1E1E] text-[20px] font-semibold">
            {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <div className="bg-white py-[5px] px-[50px] text-[#617686]">{desc}</div>
        </Collapse>
      </div>
    );
  };
  
  AccordionItem2.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  };
  
  return (
    <div className="bg-[blue] mt-[5%] grid place-items-center">
      <div className="px-[40px] max-w-[800px]">
        {accordionData.map((data, index) => {
          return (
            <AccordionItem2
              key={index}
              open={open === index}
              toggle={() => toggle(index)}
              title={data.title}
              desc={data.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccordionItems;
