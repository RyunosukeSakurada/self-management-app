import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { BiTrash } from 'react-icons/bi';

const style = {
  li: 'bg-zinc-500 mb-3 p-2 rounded min-h-[40px] cursor-pointer flex justify-between items-center',
  liClicked: 'bg-amber-500 mb-3 p-2 rounded min-h-[40px] cursor-pointer flex justify-between items-center',
};

const JournalList = ({ onJournalClick }) => {
  const [journalList, setJournalList] = useState([]);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      //retrieving a collection of journals sorted in descending order based on their creation date
      const journalCollection = await db.collection('journals').orderBy('createdAt', 'desc').get();
      const journalList = journalCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournalList(journalList);
    };

    fetchJournals();
  }, []);



  //Whenever there are changes in the documents of the "journals" collection, the latest journal list is retrieved from the database, 
  //and the journalList state is updated.
  useEffect(() => {
    //Use the onSnapshot method to listen for changes in the collection and call a callback function whenever the database state changes
    const unsubscribe = db.collection('journals').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      //Map the documents obtained from the snapshot, creating an updatedJournalList where each document 
      //is transformed into an object that includes the ID and data
      const updatedJournalList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //Use setJournalList to update the journalList state with updatedJournalList.
      setJournalList(updatedJournalList);
    });

    //When the component is unmounted, call the unsubscribe function to unsubscribe the listene
    return () => unsubscribe();
  }, []);



  //Delete journal
  const handleDeleteJournal = (id) => {
    db.collection('journals')
      .doc(id)
      .delete()
      .then(() => {
        //Filter only the journals that do not match the provided id, keeping them in the list
        setJournalList((journals) => journals.filter((journal) => journal.id !== id));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };


  const handleJournalItemClick = (journal) => {
    onJournalClick(journal);
    setSelectedJournalId(journal.id);
  };

  return (
    <ul className="lg:w-1/4">
      {journalList.map((journal) => (
        <li
          key={journal.id}
          onClick={() => handleJournalItemClick(journal)}
          className={selectedJournalId === journal.id ? style.liClicked : style.li}
        >
          <h3>{journal.title}</h3>
          <BiTrash onClick={() => handleDeleteJournal(journal.id)} />
        </li>
      ))}
    </ul>
  );
};

export default JournalList;

