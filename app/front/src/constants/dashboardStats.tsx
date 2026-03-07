import type { BackendStats, Stat } from "@/types/storeDashboard.types";

import { FaDollarSign, FaShoppingCart, FaBox, FaTicketAlt, FaEye, FaPercentage } from "react-icons/fa";

export const Stats: Omit<Stat, "value">[] = [
  {
    id: 5,
    label: "Visualizações",
    icon: FaEye,
    dataKey: "views",
  },
  {
    id: 1,
    label: "Faturamento Mensal",
    icon: FaDollarSign,
    dataKey: "revenue",
  },
  {
    id: 2,
    label: "Pedidos Recebidos",
    icon: FaShoppingCart,
    dataKey: "orders",
  },
  {
    id: 3,
    label: "Produtos Ativos",
    icon: FaBox,
    dataKey: "products",
  },
  {
    id: 4,
    label: "Cupons Ativos",
    icon: FaTicketAlt,
    dataKey: "coupons",
  },
  {
    id: 6,
    label: "Taxa de Conversão",
    icon: FaPercentage,
    dataKey: "conversion",
  },
];


const formatValues = (
  key: keyof BackendStats,
  value: number
): string => {

  switch (key) {
    case "conversion":
      return `${value}%`;

    case "revenue":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

    default:
      return value.toString();
  }
};

export const mapStats = (backendStats: BackendStats): Stat[] => {
  return Stats.map((stat) => ({
    ...stat,
    value: formatValues(
      stat.dataKey,
      backendStats[stat.dataKey]
    ),
  }));
};

