import { useState, useEffect } from 'react';

function UserDetails({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}

function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchSelectedUser() {
      if (selectedUserId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`);
        const data = await response.json();
        setSelectedUser(data);
      }
    }

    fetchSelectedUser();
  }, [selectedUserId]);

  function handleUserClick(userId) {
    setSelectedUserId(userId);
  }

  return (
    <div>
      <h1>User List</h1>
      <UserList users={users} onUserClick={handleUserClick} />
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}