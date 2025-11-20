import { createContext, useState, useEffect } from "react";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const updateContact = (index, updatedContact) => {
    setContacts(prev => prev.map((c, i) => i === index ? updatedContact : c));
  };

  const deleteContact = (index) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
