import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DictionaryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState({ spanish: '', english: '' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (index) => {
    // Implement edit functionality
  };

  const handleDelete = (index) => {
    const word = words[index];
    if (!word || !word.id) {
      // fallback: remove locally
      setWords(words.filter((_, i) => i !== index));
      return;
    }

    axios
      .delete(`http://localhost:5000/api/words/${word.id}`)
      .then(() => {
        setWords((prev) => prev.filter((w) => w.id !== word.id));
      })
      .catch((err) => console.error('Delete error', err));
  };

  const handleAddWord = () => {
    if (newWord.spanish && newWord.english) {
      axios
        .post('http://localhost:5000/api/words', {
          spanish: newWord.spanish,
          english: newWord.english,
        })
        .then((res) => {
          // backend returns { id, spanish, english }
          setWords((prev) => [...prev, res.data]);
          setNewWord({ spanish: '', english: '' });
          setShowAddModal(false);
        })
        .catch((err) => {
          console.error('Add word error', err);
        });
    }
  };

  useEffect(() => {
    // load words from backend
    axios
      .get('http://localhost:5000/api/words')
      .then((res) => setWords(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error('Fetch words error', err));
  }, []);

  return (
    <main className="flex flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
        <div className="flex flex-wrap justify-between items-center gap-4 py-6">
          <p className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
            Manage Your Dictionary
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-1">
          <div className="relative w-full sm:max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">search</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary"
              placeholder="Search by Spanish or English word..."
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span className="truncate">Add New Word</span>
          </button>
        </div>

        <div className="flex-grow">
          <div className="px-1 py-3 @container">
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-background-dark/50 shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Spanish Word
                    </th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      English Word
                    </th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50">
                  {words.map((word, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {word.spanish}
                      </td>
                      <td className="h-[72px] px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {word.english}
                      </td>
                      <td className="h-[72px] px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="flex items-center justify-center size-8 rounded-lg hover:bg-primary/20 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="flex items-center justify-center size-8 rounded-lg hover:bg-red-500/20 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg rounded-xl border border-neutral-200/70 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-lg">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Add New Word</p>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
                <div className="p-6">
                  <form className="flex flex-col gap-6">
                    <label className="flex flex-col w-full">
                      <p className="pb-2 text-base font-medium text-neutral-800 dark:text-neutral-200">
                        Spanish Word
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbe3e6] bg-white p-3.5 text-base font-normal leading-normal text-[#111618] placeholder:text-[#617f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary"
                        placeholder="Enter Spanish word"
                        value={newWord.spanish}
                        onChange={(e) => setNewWord({ ...newWord, spanish: e.target.value })}
                      />
                    </label>
                    <label className="flex flex-col w-full">
                      <p className="pb-2 text-base font-medium text-neutral-800 dark:text-neutral-200">
                        English Word
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbe3e6] bg-white p-3.5 text-base font-normal leading-normal text-[#111618] placeholder:text-[#617f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary"
                        placeholder="Enter English word"
                        value={newWord.english}
                        onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
                      />
                    </label>
                  </form>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 p-6 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-neutral-100 text-neutral-800 text-base font-bold leading-normal tracking-[0.015em] hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <span className="truncate">Cancel</span>
                  </button>
                  <button
                    onClick={handleAddWord}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
                  >
                    <span className="truncate">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DictionaryManagement;