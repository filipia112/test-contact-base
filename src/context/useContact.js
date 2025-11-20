import { useContext } from "react";
import { ContactContext } from "./ContactContext";

export const useContact = () => useContext(ContactContext);
