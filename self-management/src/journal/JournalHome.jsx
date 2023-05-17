import React, { useState } from 'react';
import JournalList from './JournalList';
import JournalContent from './JournalContent';
import { db } from '../firebase';

const JournalHome = () => {
  const [selectedJournal, setSelectedJournal] = useState(null);

  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
  };

  const handleAddJournal = (e) => {
    e.preventDefault();
    try {
      const newJournal = {
        title: 'Title',
        content: '',
        createdAt: new Date().toISOString(),
      };

      const docRef = db.collection('journals').add(newJournal);
      const journalId = docRef.id;

      const updatedJournalList = [{ id: journalId, ...newJournal }, ...journalList];
      setJournalList(updatedJournalList);

      setSelectedJournal({ id: journalId, ...newJournal });
    } catch (error) {
      console.error('Error adding journal: ', error);
    }
  };

  return (
    <div className='bg-zinc-900 lg:w-3/4 text-zinc-200 mt-8 md:mt-0'>
      <div className='p-4 flex items-center justify-between'>
        <h4 className="text-2xl">Journal</h4>
        <button className='py-2 px-4 border hover:bg-amber-500 hover:text-zinc-900 hover:border-zinc-900' onClick={handleAddJournal}>Add new journal</button>
      </div>
      <div className='lg:flex gap-x-4 p-4'>
        <JournalList onJournalClick={handleJournalClick} />
        <JournalContent selectedJournal={selectedJournal} />
      </div>
    </div>
  );
};

export default JournalHome;

