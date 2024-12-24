import { useState } from "react";
import { Collapse } from "react-collapse";
import Navbar from "../components/Navbar";
import TradingViewWidget from "../widgets/Widgets";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  const accordionData = [
    {
      title: "What is Blocktrademine?",
      desc: "Blocktrademine offers cryptocurrency mining without having to buy any equipment. Instead of it you are buying mining hashpower from our industrial mining equipment supplier BitFury with its data centers located in Canada, Norway, Iceland, and Georgia. Blocktrademine was created to ensure the effective mining and to provide professionals and newcomers with an access to the same quality resources as the industrial miners possess. Our cooperation with the industry leaders and access to the newest and most advanced technologies in the industry, quickly made us one of the world‘s leading mining services.",
    },
    {
      title: "How does cryptocurrency mining work on your platform?",
      desc: `It's pretty quick and easy. As soon as we receive a payment for your order, your contract will be added to your profile. Your order consists of two parts:
             one-time payment (not deposit) for allocation of ordered power
        a daily maintenance fee for the equipment maintenance and its power supply
       When you are paying one-time payment, you are receiving hashpower according to your contract terms and duration. You will also pay an everyday maintenance fee (for Bitcoin mining only). The maintenance fee is automatically deducted from your mined BTC volume on a daily basis. The applied BTC/USD conversion rate is based on the previous day's Bitcoin closing price in USD published on www.coinmarketcap.com. If you don't have enough balance during three days to cover your daily maintenance fee, the mining contract and service will be canceled.`,
    },
    {
      title: "What does 100% uptime guarantee mean?",
      desc: `If you were an individual miner there would be always a possibility that your mining hardware could crash, slow down or completely break. Using our platform you will never face any issues like these.`,
    },
    {
      title: "How much can I earn?",
      desc: `Earning per day depends on many factors, such as Block reward, Difficulty, Blocks mined etc and they can't be predicted. All the mined coins will be automatically added to your balance.
Please note that our payout is based on overall network hashrate, and 100% uptime is guaranteed.
We recommend all our clients to do their own research and their own earning calculation, however, we have some helpful tools for this.
You can go to the “calculator” tab which is at the top of our website to see how you can calculate your earnings.`,
    },
    {
      title: "How can I pay?",
      desc: `You can pay using:
Bitcoin ATMs: locate an ATM through https://coinatmradar.com
Bitcoins: you can buy Bitcoin on any online exchanger:
https://binance.com/
https://www.coinbase.com/
https://bitcoin.info/
https://kraken.com/
https://localbitcoins.com/
https://coinmama.com/
https://shapeshift.com/`,
    },
    {
      title: "What is maintenance fee?",
      desc: `The maintenance fee covers all costs related to mining including, inter alia:

electricity cost
cooling systems
maintenance work
hosting services`,
    },
    {
      title: "When does mining start?",
      desc: `Mining starts automatically at 00:00 UTC. Mined coins are credited automatically to the customer's balance once a day for the previous mining day.`,
    },
    {
      title: "How to restore the password?",
      desc: `In order to restore your password, please:

Click on the Sign In
Enter your email
Click on the "I can't access my account"
You will receive an email with further step by step instructions`,
    },
    {
      title: "How do I withdraw?",
      desc: `In order to make a withdrawal:

Sign In to your account
Go to menu item "Balance - Withdrawal"
Choose type of coins
Enter amount
Choose your wallet (or enter new wallet)
Click on the withdraw button
Check your email inbox, you will receive an email with confirmation link
Click on the confirmation link
Our minimum withdrawal amount is 0.0007 BTC. You can request a withdrawal any time. Withdrawal requests are processed the next day after the request has been placed (UTC time)`,
    },
    {
      title: "Which coins do I receive for mining?",
      desc: `We can guarantee that you will receive only new coins, which have been recently mined. This can be checked on blockchain.info by putting in the transaction that you receive after your withdrawal from our service. Thus, everyone can be confident that we are indeed mining coins, and we are not some Ponzi scheme.`,
    },
    {
        title: "How often will i receive my coins?",
        desc: `Newly mined coins are credited to your balance once per day for the previous mining day.

Our minimum withdrawal amount is 0.0007 BTC. You can request a withdrawal any time..`,
      },
    {
      title:
        "What do I do if I paid the money for the contract but it wasn't activated?",
      desc: `No, any internet enabled device is good enough to access our trading platform and facilities worldwide.`,
    },
    {
      title: "What does the payout amount depend on?",
      desc: `The payout depends on many technical factors like mining difficulty, total network hashrate, blocks mined per day, and amount of the block reward. Financial factors also affect the payout, like transaction fees or BTC/USD (and more generally, crypto/fiat) exchange rates. Note that our payout is based on 100% uptime guarantee.
The rule of thumb is that a higher BTC price means lower maintenance fees and higher total payout.
We recommend all our clients to do their own research and their own earning calculation, however, we have some helpful tools for this. You can go to the “Calculator” tab which is on the top of our website to see how you can calculate your earnings.`,
    },
    {
      title: "How to close my user account at Blocktrademine?",
      desc: `If you want to close your user account at Hashing24, please send us an email to support@hashing24.com specifying your request. 
      Your application for user account closing will be reviewed as soon as possible and all your personal data associated with your user account at Hashing24 will be deleted within 24 hours.`,
    },
  ];

  const AccordionItem2 = ({ open, toggle, title, desc }) => {
    return (
      <div className="border rounded shadow-md pt-[10px]">
        <div
          className="bg-white py-[25px] px-[50px] flex justify-between items-center cursor-pointer"
          onClick={toggle}
        >
          <h2 className="text-[blue] text-[20px] font-semibold">{title}</h2>
          <div className="text-[#1E1E1E] text-[20px] font-semibold">
            {open ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        </div>
        <Collapse isOpened={open}>
          <div className="bg-white pb-[10px] px-[50px] text-[#617686]">
            {desc}
          </div>
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
    <div>
      <TradingViewWidget />
      <Navbar />
      <div className="flex items-center justify-center mt-[150px] px-8">
        <div>
          <h2 className="text-[38px] mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p>
            Below are some of the most common questions about BlocktradeMine
          </p>
        </div>
      </div>
      <div className=" mt-[5%] grid place-items-center mb-10">
        <div className="grid gap-3 px-[40px] max-w-[800px]">
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
      <Footer />
    </div>
  );
};

export default FAQ;
