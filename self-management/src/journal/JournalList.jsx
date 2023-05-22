import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { BiTrash } from 'react-icons/bi';

const style = {
  li: 'bg-zinc-500 mb-3 p-2 rounded min-h-[40px] cursor-pointer flex justify-between items-center',
  liClicked: 'bg-amber-500 mb-3 p-2 rounded min-h-[40px] cursor-pointer flex justify-between items-center',
};

const JournalList = ({ onJournalClick }) => {
  const [journalList, setJournalList] = useState([]);
  //選択されたジャーナルのIDを保持し、selectedJournalIdの状態を更新するための関数
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  //初期表示時にジャーナルのデータを取得する
  useEffect(() => {
    const fetchJournals = async () => {
      //データベースからジャーナルのコレクションを取得
      const journalCollection = await db.collection('journals').orderBy('createdAt', 'desc').get();
      //取得したデータをjournalListにマッピングし、setJournalListを使用して状態を更新
      const journalList = journalCollection.docs.map((doc) => ({
        //新しいオブジェクトを作成
        id: doc.id, //ドキュメントのidプロパティ
        ...doc.data(), //その他のデータ
      }));
      //コンポーネントの再レンダリングがトリガーされ、画面上のジャーナルリストが更新
      setJournalList(journalList);
    };

    fetchJournals();
  }, []);


  //ジャーナルのリアルタイム更新を監視
  useEffect(() => {
    //Firestoreのクエリを使用してジャーナルのコレクションを取得し、そのコレクションの変更をリアルタイムで監視する
    const unsubscribe = db.collection('journals').orderBy('createdAt', 'desc').onSnapshot((snapshot) => { //.onSnapshot():ジャーナルのコレクションが変更されるたびに呼び出されるコールバック関数
      const updatedJournalList = snapshot.docs.map((doc) => ({
        //各ドキュメントのidプロパティとデータ（doc.data()）を含むオブジェクトを作成
        id: doc.id,
        ...doc.data(),
      }));
      //新しいジャーナルリストをjournalListの状態として更新
      setJournalList(updatedJournalList);
    });

    //コンポーネントがアンマウントされる際に実行され、unsubscribeメソッドを呼び出してリアルタイム更新の購読を解除
    return () => unsubscribe();
  }, []);


  //ジャーナルの削除
  const handleDeleteJournal = (id) => {
    //指定されたIDのジャーナルをFirestoreから削除
    db.collection('journals')
      .doc(id)
      .delete()
      //setJournalListを使用してjournalListの状態を更新
      .then(() => {
        //journal.idが指定されたIDと異なるジャーナルのみを残す
        setJournalList((journals) => journals.filter((journal) => journal.id !== id));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };


  //ジャーナルがクリックされた時に実行
  const handleJournalItemClick = (journal) => {
    //クリックされたジャーナルの情報を受け取る
    onJournalClick(journal);
    //journalオブジェクトのidプロパティを使用して、選択されたジャーナルのIDを管理するための状態を更新
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

