import { useState, useEffect } from 'react';
import './DictionaryManagement.css';
import axios from 'axios';

const DictionaryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState([]);
  const [originalWords, setOriginalWords] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState({ spanish: '', english: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editWord, setEditWord] = useState({ spanish: '', english: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const performSearch = () => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!term) {
      setWords(Array.isArray(originalWords) ? originalWords : []);
      return;
    }

    setWords(
      (originalWords || []).filter((w) => {
        const s = (w.spanish || '').toLowerCase();
        const en = (w.english || '').toLowerCase();
        return s.includes(term) || en.includes(term);
      })
    );
  };

  const handleEdit = (index) => {
    const word = words[index];
    setEditWord({ spanish: word.spanish, english: word.english });
    setEditingIndex(index);
    setShowEditModal(true);
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

  const handleEditWord = () => {
    if (editWord.spanish && editWord.english && editingIndex !== null) {
      const word = words[editingIndex];
      if (!word || !word.id) {
        // fallback: update locally
        setWords((prev) =>
          prev.map((w, i) =>
            i === editingIndex ? { ...w, spanish: editWord.spanish, english: editWord.english } : w
          )
        );
        setShowEditModal(false);
        setEditingIndex(null);
        return;
      }

      axios
        .put(`http://localhost:5000/api/words/${word.id}`, {
          spanish: editWord.spanish,
          english: editWord.english,
        })
        .then(() => {
          setWords((prev) =>
            prev.map((w, i) =>
              i === editingIndex ? { ...w, spanish: editWord.spanish, english: editWord.english } : w
            )
          );
          setShowEditModal(false);
          setEditingIndex(null);
        })
        .catch((err) => {
          console.error('Edit word error', err);
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
      <div className="layout-content-container dict-page flex flex-col w-full max-w-5xl flex-1">
        <div className="flex flex-wrap justify-between items-center gap-4 py-6">
          <p className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72 dict-title">
            Manage Your Dictionary
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-1 dict-controls">
          <div className="relative w-full sm:max-w-xs">
              <button
                type="button"
                onClick={performSearch}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400"
                aria-label="Search"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch();
                  }
                }}
              className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-200 focus:border-primary focus:ring-primary dict-search-input"
              placeholder="Search by Spanish or English word..."
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 dict-add-btn"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span className="truncate">Add New Word</span>
          </button>
        </div>

        <div className="flex-grow">
          <div className="px-1 py-3 @container">
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-background-dark/50 shadow-sm dict-table">
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
                        <div className="flex justify-end gap-2 dict-actions">
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
            <div className="dict-pagination" aria-label="pagination">
              <button className="page-dot">&lt;</button>
              <button className="page-dot active">1</button>
              <button className="page-dot">2</button>
              <button className="page-dot">3</button>
              <span className="page-dot">...</span>
              <button className="page-dot">10</button>
              <button className="page-dot">&gt;</button>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="dict-modal-overlay">
            <div className="dict-modal">
              <div className="flex flex-col">
                <div className="modal-header">
                  <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Add New Word</p>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-[#1a202c] dark:text-gray-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className="flex flex-col gap-6">
                    <label className="flex flex-col w-full">
                      <p className="pb-2 text-base font-medium text-[#1a202c] dark:text-white">
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
                      <p className="pb-2 text-base font-medium text-[#1a202c] dark:text-white">
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
                <div className="modal-footer">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 text-[#1a202c] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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

        {showEditModal && (
          <div className="dict-modal-overlay">
            <div className="dict-modal">
              <div className="flex flex-col">
                <div className="modal-header">
                  <p className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Edit Word</p>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingIndex(null);
                    }}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-transparent text-[#1a202c] dark:text-gray-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className="flex flex-col gap-6">
                    <label className="flex flex-col w-full">
                      <p className="pb-2 text-base font-medium text-[#1a202c] dark:text-white">
                        Spanish Word
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbe3e6] bg-white p-3.5 text-base font-normal leading-normal text-[#111618] placeholder:text-[#617f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary"
                        placeholder="Enter Spanish word"
                        value={editWord.spanish}
                        onChange={(e) => setEditWord({ ...editWord, spanish: e.target.value })}
                      />
                    </label>
                    <label className="flex flex-col w-full">
                      <p className="pb-2 text-base font-medium text-[#1a202c] dark:text-white">
                        English Word
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#dbe3e6] bg-white p-3.5 text-base font-normal leading-normal text-[#111618] placeholder:text-[#617f89] focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-primary"
                        placeholder="Enter English word"
                        value={editWord.english}
                        onChange={(e) => setEditWord({ ...editWord, english: e.target.value })}
                      />
                    </label>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingIndex(null);
                    }}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 text-[#1a202c] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    <span className="truncate">Cancel</span>
                  </button>
                  <button
                    onClick={handleEditWord}
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