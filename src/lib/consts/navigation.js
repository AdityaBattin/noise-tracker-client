import { AiFillHome, AiOutlineAreaChart, AiTwotoneSetting } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'

export const HEADER_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    key: "chart",
    label: "Chart",
    path: "/chart",
    icon: <AiOutlineAreaChart />,
  },
  {
    key: "info",
    label: "Info",
    path: "/info",
    icon: <BsInfoCircle />,
  },
];