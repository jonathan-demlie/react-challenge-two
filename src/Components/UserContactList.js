import React from "react";
import UserContact from "./UserContact";

const UserContactList = ({ listId, contactList }) => {
  return (
    <div id={listId}>
      {/* ix andFImplement goes here */}
      <UserContact key={index} contact={contact} />
    </div>
  );
};

export default UserContactList;
