import React, { useState, useEffect } from "react";

const API_URL = "https://bankapibackend.onrender.com/accounts";

export default function App() {
  const [accounts, setAccounts] = useState({});
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const fetchAccounts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const createAccount = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, balance: parseFloat(balance) }),
    });
    fetchAccounts();
  };

  const updateAccount = async () => {
    await fetch(`${API_URL}/${updateId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, balance: parseFloat(balance) }),
    });
    fetchAccounts();
    setUpdateId(null);
  };

  const deleteAccount = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchAccounts();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏦 Bank Account Manager</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Balance"
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={updateId ? updateAccount : createAccount}
      >
        {updateId ? "Update Account" : "Create Account"}
      </button>

      <ul className="mt-4">
        {Object.entries(accounts).map(([id, account]) => (
          <li
            key={id}
            className="border p-2 flex justify-between items-center mb-2"
          >
            <span>
              {account.name} - 💰 ${account.balance}
            </span>
            <div>
              <button
                className="bg-yellow-400 px-2 py-1 rounded mr-2"
                onClick={() => {
                  setName(account.name);
                  setBalance(account.balance);
                  setUpdateId(id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteAccount(id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
