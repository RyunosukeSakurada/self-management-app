import React, { useState } from 'react';
import JournalList from './JournalList';
import JournalContent from './JournalContent';
import { db } from '../firebase';

const JournalHome = () => {
  //Journalが選択されているかどうかの状態変数
  const [selectedJournal, setSelectedJournal] = useState(null);


  //選択されているjournalの定義
  const handleJournalClick = (journal) => {
    //selectedJournalの値がjournalの値に更新される
    setSelectedJournal(journal);
  };


  //Journalの追加
  const handleAddJournal = (e) => {
    //フォームの送信時にページがリロードされるのを防ぐ
    e.preventDefault();
    try {
      //新しいジャーナル（newJournal）オブジェクトを作成
      const newJournal = {
        title: 'Title',
        content: '',
        //現在の日時を表すISO形式の文字列
        createdAt: new Date().toISOString(),
      };

      //追加されたジャーナルのドキュメントへの参照が格納
      const docRef = db.collection('journals').add(newJournal);
      //新しく作成されたジャーナルのIDを取得
      const journalId = docRef.id;

      //selectedJournalの状態を更新。この関数は、idプロパティにjournalIdを持つオブジェクトをnewJournalオブジェクトとマージして呼び出されます。
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

