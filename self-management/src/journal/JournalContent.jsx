import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const JournalContent = ({ selectedJournal }) => {
  //State to retain the title of a journal being edited
  const [editedTitle, setEditedTitle] = useState(selectedJournal?.title || '');
  //State to retain the content of a journal being edited
  const [editedContent, setEditedContent] = useState(selectedJournal?.content || '');

  //Update the title and content being edited when selectedJournal is modified. 
  //If selectedJournal exists, set its title and content in the state
  useEffect(() => {
    setEditedTitle(selectedJournal?.title || '');
    setEditedContent(selectedJournal?.content || '');
  }, [selectedJournal]);

  //Detects a change in the title and updates the state of "editedTitle"
  const handleJournalTitleChange = (e) => {
    const updatedTitle = e.target.value;
    //Called when the title and content of the journal are modified.
    setEditedTitle(updatedTitle);
    //Update the title of the journal in the database
    db.collection('journals').doc(selectedJournal.id).update({ title: updatedTitle });
  };

  //Detects a change in the content and updates the state of "editedTitle"
  const handleJournalContentChange = (e) => {
    const updatedContent = e.target.value;
    //Called when the title and content of the journal are modified.
    setEditedContent(updatedContent);
    //Update the content of the journal in the database
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




