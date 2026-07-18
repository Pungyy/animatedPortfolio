import { useContext } from "react";
import PortfolioContext from "../contexts/PortfolioContext";

export default function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolio must be used inside PortfolioProvider"
    );
  }

  return context;
}