import React from "react";

const UserContact = ({ contact }) => {
  if (!contact) return null;
  // Implement goes here
  return (
    <div className="contact-info" id={`contact-${contact.id.value}`}>
      {/* Implement goes here */}
    </div>
  );
};

export default UserContact;
