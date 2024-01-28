import React from "react";

const Header = ({ isSyncing, sync, onFilter, error }) => (
  <div className="contactInfoHeaderWrapper">
    <div>Car Dashboard</div>
    <div>
      <input onChange={onFilter} />
    </div>
    <div>
      <button disabled={isSyncing} onClick={sync}>
        {isSyncing ? "Syncing" : "Sync"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  </div>
);

export default Header;
