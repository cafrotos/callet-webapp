import { useLocation } from "react-router-dom"
import { InvoiceMenu } from "./InvoiceMenu";

export const HeaderMenu = () => {
  const location = useLocation();

  switch (true) {
    case location.pathname.includes("invoices"):
      return <InvoiceMenu />

    default:
      return <div />
  }
}