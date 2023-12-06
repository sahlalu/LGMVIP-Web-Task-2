import React, { useState }
from 'react';
import './App.css'; 

function App(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try{
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setDataFetched(true);
    } catch (error) {
      console.error('Error Fetching Data:' ,error);
    }
    setLoading(false)
  };


  return (
    <div className='App'>
      <nav className='navbar'>
        <div className='brand'>Core Unity Solutions Ltd.</div>
        <button onClick={fetchUsers}>Get Users</button>
      </nav>
      <div className='title'>Users</div>
      { dataFetched && (
      <div className='user-grid'>
        {loading ? (
          <div className='loader'>Loading...</div>
        ) : (
          users.map(user => (
            <div key={user.id} className='user-card'>
              <img src={user.avatar} alt={user.first_name} />
              <div className='user-info'>
              <div className='user-name'>Name : {user.first_name} {user.last_name}</div>
              <p> Email : {user.email}</p>
              </div>
              </div>
          ))
        )}
      </div>
  )}
  { !dataFetched && loading && (
    <div className='loader'>Loading...</div>
  )}
    </div>
  );

}

export default App;