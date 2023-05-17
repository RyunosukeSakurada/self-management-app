import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const JournalContent = ({ selectedJournal }) => {
  const [editedTitle, setEditedTitle] = useState(selectedJournal?.title || '');
  const [editedContent, setEditedContent] = useState(selectedJournal?.content || '');

  useEffect(() => {
    setEditedTitle(selectedJournal?.title || '');
    setEditedContent(selectedJournal?.content || '');
  }, [selectedJournal]);

  const handleJournalTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setEditedTitle(updatedTitle);
    db.collection('journals').doc(selectedJournal.id).update({ title: updatedTitle });
  };

  const handleJournalContentChange = (e) => {
    const updatedContent = e.target.value;
    setEditedContent(updatedContent);
    db.collection('journals').doc(selectedJournal.id).update({ content: updatedContent });
  };

  return (
    <div className="lg:w-3/4 bg-zinc-800 min-h-[500px] rounded">
      {selectedJournal ? (
        <div>
          <input
            value={editedTitle}
            onChange={handleJournalTitleChange}
            placeholder='Title'
            className="bg-zinc-800 w-full min-h-[50px] border-b-2 border-black p-2"
          />
          <textarea
            value={editedContent}
            placeholder='Content'
            onChange={handleJournalContentChange}
            className="w-full bg-zinc-800 p-2 min-h-[500px]"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[500px]">
          <p className="text-3xl">Select a journal to view its content.</p>
        </div>
      )}
    </div>
  );
};

export default JournalContent;




