import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const JournalContent = ({ selectedJournal }) => {
  //編集されたジャーナルのタイトルとコンテンツを保持するための状態変数
  //selectedJournalが存在する場合はそのタイトルとコンテンツを、存在しない場合は空文字列を使用
  const [editedTitle, setEditedTitle] = useState(selectedJournal?.title || '');
  const [editedContent, setEditedContent] = useState(selectedJournal?.content || '');


  //selectedJournalの変更を監視し、変更があった場合にeditedTitleとeditedContentを更新
  useEffect(() => {
    setEditedTitle(selectedJournal?.title || '');
    setEditedContent(selectedJournal?.content || '');
  }, [selectedJournal]);


  //ジャーナルのタイトルが変更された時に実行される関数
  const handleJournalTitleChange = (e) => {
    //e.target.valueで入力された新しいタイトルを取得
    const updatedTitle = e.target.value;
    //editedTitleの状態を更新
    setEditedTitle(updatedTitle);
    //Firestore上の該当するドキュメントのタイトルを更新
    db.collection('journals').doc(selectedJournal.id).update({ title: updatedTitle });
  };


  //ジャーナルのコンテンツが変更された時に実行される関数
  const handleJournalContentChange = (e) => {
    //e.target.valueで入力された新しいコンテンツを取得
    const updatedContent = e.target.value;
    //editedContentの状態を更新
    setEditedContent(updatedContent);
    //Firestore上の該当するドキュメントのコンテンツを更新
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
            onChange={handleJournalContentChange}
            placeholder='Content'
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




