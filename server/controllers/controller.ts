//This is driver code of the problem



const firestore = require('firebase-admin').firestore;
const firebase = require('../firebaseconfiguration/firebase-admin');
const TableConfig = require('../../src/components/tableConfig.json');

module.exports = {

// initTable - use to create collection in firebase with all the tables configuration names
// and an array of users on the table initially an empty array.
  initTable: (req: any, res: any) => {
    console.log("Initializing Table");
    const referenceTable = firebase.firestore().collection('tables');

    TableConfig.tables.forEach(async (table: { id: string }, i: number) => {
      await referenceTable.doc(table.id).set({ name: table.id, usersArray: [], order: i });
      const usersRef = referenceTable.doc(table.id).collection('users');
      
      //empty the users array
      const users = await usersRef.get();
      users.docs.forEach((element: any) => {
        usersRef.doc(element.id).delete();
      });
    });
    return res.json({ status: 'Good to Go' });
  },

// assignTable - when new user logged in this piece of code assign table to new user.

  assignTable: async (req: any, res: any) => {
    console.log('Assigning the table');

    let currentUser = req['currentUser'];

    const referenceTable = firebase.firestore().collection('tables');
    
    //check if the table is already alloted to user or not
    
    let assignedTable = await referenceTable
      .where('usersArray', 'array-contains', currentUser?.uid)
      .get();

    //if table is not alloted then alot one

    if (assignedTable.empty) {
      const tables = await referenceTable.orderBy('order').get();

      let index = 0;
      let userIndex = tables.docs[0].data().usersArray.length;
      tables.docs.forEach((element: any, index: number) => {
        const tableUsersCount = element.data().usersArray.length;
        if (tableUsersCount > 0 && tableUsersCount < userIndex) {
          index = index;
          userIndex = tableUsersCount;
        }
      });

      //if the table already has two user then get the empty table

      if (userIndex >= 2) {
        index = 0;
        userIndex = tables.docs[0].data().usersArray.length;
        tables.docs.forEach((element: any, i: number) => {
          const tableUsersCount = element.data().usersArray.length;
          if (tableUsersCount < userIndex) {
            index = i;
            userIndex = tableUsersCount;
          }
        });
      }

      //if the table has less than three members then assign the table

      if (userIndex < 3) {
        const tableUID = tables.docs[index].id;
        const { uid, name, picture, email } = currentUser || {};

        referenceTable.doc(tableUID).update({
          usersArray: firestore.FieldValue.arrayUnion(uid),
        });
        referenceTable.doc(tableUID).collection('users').doc(uid).set({ uid, name, picture, email });

        console.log('The Assigned Table is:', tableUID);
        return res.json({ msg: 'Table assigned', assignedTable: tableUID });
      } else {
        return res.json({ error: 'All tables are busy' });
      }
    } else {
      console.log('Already a table assigned to this user', assignedTable.docs[0].id);
      return res.json({ msg: 'Already a table assigned to this user' });
    }
  },

  //driver code to switch the table by double click

  switchTable: async (req: any, res: any) => {
    console.log('Switching to Another Table');
    const currentUser = req['currentUser'];
    const { uid, name, picture, email } = currentUser || {};
    const { tableUID } = req.body;

    const referenceTable = firebase.firestore().collection('tables');

    let desiredTable = await referenceTable.doc(tableUID).get();

    //check if the desired table has already 3 members or not.

    if (desiredTable.data().usersArray.length >= 3) {
      return res.json({ error: 'Unable to switch to new table.' });
    }

    const batch = firebase.firestore().batch();

    let initTable = await referenceTable.where('usersArray', 'array-contains', uid).get();


    //Remove user from the collection

    if (!initTable.empty) {
      const userRef = referenceTable.doc(initTable.docs[0].id).collection('users').doc(uid);
      batch.delete(userRef);

      const userArrRef = referenceTable.doc(initTable.docs[0].id);
      batch.update(userArrRef, {
        usersArray: firestore.FieldValue.arrayRemove(uid),
      });
    }

    const desired = referenceTable.doc(tableUID);
    batch.update(desired, {
      usersArray: firestore.FieldValue.arrayUnion(uid),
    });

    const desiredUsers = referenceTable.doc(tableUID).collection('users').doc(uid);
    batch.set(desiredUsers, { uid, name, picture, email });

    await batch.commit();

    return res.json({ msg: 'Switching table with', to: tableUID });
  },
};
export {}