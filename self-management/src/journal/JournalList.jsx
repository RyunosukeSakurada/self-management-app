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
      const journalCollection = await db.collection('journals').orderBy('createdAt', 'desc').get();
      const journalList = journalCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournalList(journalList);
    };

    fetchJournals();
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('journals').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      const updatedJournalList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournalList(updatedJournalList);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteJournal = (id) => {
    db.collection('journals')
      .doc(id)
      .delete()
      .then(() => {
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

