//Frontend code to call the api's

import React, { useState, useEffect } from 'react';
import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import Firebase, { db } from '../services/firebase';
import { sendPostRequest } from '../apis';

const Theater: React.FC = () => {
  const profile = Firebase.auth().currentUser;

  //Creating the array of all the seats from the configuration files and empty array

  const initialTablesState = TableConfig.tables
    .map((t, i) => ({ order: i, key: t.id }))
    .reduce((a, v) => ({ ...a, [v.key]: { id: v.key, users: [] } }), {});

  const [tableList, settableList] = useState(initialTablesState);
  const [displayUser, setdisplayUser] = useState(false);

  //calling the api to assign table
  useEffect(() => {
    sendPostRequest(`http://localhost:8000/assignTable`, { uid: profile?.uid }).then((response) => {
      console.log(("yyy"));
      if (response.error) {
        alert(response.error);
      }
    });
    const tablesRef = db.collection('tables');

    tablesRef.get().then((tables) => {
      tables.docs.forEach((doc) => {
        const usersRef = tablesRef.doc(doc.id).collection('users');
        usersRef.onSnapshot((querySnapshot) => {
          const users: { id: string }[] = [];
          querySnapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data(),
            });
          });

          settableList((tc) => ({
            ...tc,
            [doc.id]: { ...tc[doc.id], users },
          }));
        });
      });
    });
  }, []);


  const moveTable = (tableUID: string) => {
    sendPostRequest(`switchTable`, { tableUID }).then((response) => {
      if (response.error) {
        alert(response.error);
      }
    });
  };

  const onDisplayUser = () => {
    setdisplayUser(true);
    setTimeout(() => {
      setdisplayUser(false);
    }, 4000);
  };

  return (
    <div className="remo-theater" style={{ width: TableConfig.width, height: TableConfig.height }}>
      <div className="rt-app-bar">
        <div>
          <h4>{profile?.displayName}</h4>
          <button className="rt-button" onClick={onDisplayUser} disabled={displayUser}>
            Position
          </button>
        </div>
      </div>

      <div className="rt-rooms">
        {TableConfig.tables.map((table) => (
          <div
            key={table.id}
            className="rt-room"
            style={{
              width: table.width,
              height: table.height,
              top: table.y,
              left: table.x,
            }}
            onDoubleClick={() => moveTable(table.id)}
          >
            {tableList[table.id].users.map((user: any, i: number) => (
              <div
                key={user.id}
                className={`rt-user ${profile?.uid == user.id && displayUser ? 'zoom' : ''}`}
                style={{
                  top: table.seats[i].y,
                  left: table.seats[i].x,
                  backgroundImage: `url(${user.picture})`,
                }}
              />
            ))}
            <div className="rt-room-name">{table.id}</div>
          </div>
        ))}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div>
  );
};

export default Theater;
