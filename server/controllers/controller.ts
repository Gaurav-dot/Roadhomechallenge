const firestore = require('firebase-admin').firestore;
const firebase = require('../firebaseconfiguration/firebase-admin');
const TableConfig = require('../../src/components/tableConfig.json');

module.exports = {
  initTable: (req: any, res: any) => {
    console.log("Initializing Table");
    const referenceTable = firebase.firestore().collection('tables');

    TableConfig.tables.forEach(async (table: { id: string }, i: number) => {
      await referenceTable.doc(table.id).set({ name: table.id, usersArray: [], order: i });
      const usersRef = referenceTable.doc(table.id).collection('users');
      const users = await usersRef.get();
      users.docs.forEach((element: any) => {
        usersRef.doc(element.id).delete();
      });
    });
    return res.json({ status: 'ok' });
  },
  assignTable: async (req: any, res: any) => {
    console.log('Assigning the table');

    let currentUser = req['currentUser'];

    const referenceTable = firebase.firestore().collection('tables');
    let assignedTable = await referenceTable
      .where('usersArray', 'array-contains', currentUser?.uid)
      .get();
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

      if (userIndex < 3) {
        const tableUID = tables.docs[index].id;
        const { uid, name, picture, email } = currentUser || {};

        referenceTable.doc(tableUID).update({
          usersArray: firestore.FieldValue.arrayUnion(uid),
        });
        referenceTable.doc(tableUID).collection('users').doc(uid).set({ uid, name, picture, email });

        console.log('Assigning Table:', tableUID);
        return res.json({ msg: 'Table assigned', assignedTable: tableUID });
      } else {
        return res.json({ error: 'All tables are occupied' });
      }
    } else {
      console.log('User has already a table assigned:', assignedTable.docs[0].id);
      return res.json({ msg: 'User has already a table assigned' });
    }
  },

  switchTable: async (req: any, res: any) => {
    console.log('Switching to Another Table');
    const currentUser = req['currentUser'];
    const { uid, name, picture, email } = currentUser || {};
    const { tableUID } = req.body;

    const referenceTable = firebase.firestore().collection('tables');

    let destinyTable = await referenceTable.doc(tableUID).get();
    if (destinyTable.data().usersArray.length >= 3) {
      return res.status(400).json({ error: 'Unable to move to new table. Max users reach' });
    }

    const batch = firebase.firestore().batch();

    let initialTable = await referenceTable.where('usersArray', 'array-contains', uid).get();

    if (!initialTable.empty) {
      const userRef = referenceTable.doc(initialTable.docs[0].id).collection('users').doc(uid);
      batch.delete(userRef);

      const userArrRef = referenceTable.doc(initialTable.docs[0].id);
      batch.update(userArrRef, {
        usersArray: firestore.FieldValue.arrayRemove(uid),
      });
    }

    const designation = referenceTable.doc(tableUID);
    batch.update(designation, {
      usersArray: firestore.FieldValue.arrayUnion(uid),
    });

    const designationUsers = referenceTable.doc(tableUID).collection('users').doc(uid);
    batch.set(designationUsers, { uid, name, picture, email });

    await batch.commit();

    return res.json({ msg: 'Switching table with', to: tableUID });
  },
};
export {}