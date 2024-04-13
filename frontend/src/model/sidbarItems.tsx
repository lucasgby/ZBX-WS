import { AiFillHome  } from "@react-icons/all-files/ai/AiFillHome";
import { IoCalendar } from "@react-icons/all-files/io5/IoCalendar";
import { FiGrid } from "@react-icons/all-files/fi/FiGrid";
import { HiMiniCommandLine } from "react-icons/hi2";
import { IoLogoWhatsapp } from "@react-icons/all-files/io/IoLogoWhatsapp";
import { HiDocumentReport } from "@react-icons/all-files/hi/HiDocumentReport";

export interface SidbarItemsType {
  href: string;
  name: string;
  icon: JSX.Element
}

export const sidbarItems = [
  {
    id: 1,
    name: "Home",
    href: "/home",
    icon: <AiFillHome />
  },

  {
    id: 2,
    name: "Sessão",
    href: "/session",
    icon: <FiGrid />
  },

  {
    id: 3,
    name: "Agendamentos",
    href: "/agend",
    icon: <IoCalendar />
  },

  {
    id: 4,
    name: "Comandos",
    href: "/command",
    icon: <HiMiniCommandLine />
  },

  {
    id: 5,
    name: "Grupos",
    href: "/group",
    icon: <IoLogoWhatsapp />
  },

  {
    id: 6,
    name: "Relatórios",
    href: "/report",
    icon: <HiDocumentReport />
  }
]