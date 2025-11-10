import React, { useState } from 'react';
import axios from 'axios';
import './TranslatorForm.css';

const TranslatorForm = () => {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [fromLanguage, setFromLanguage] = useState('Spanish');
  const [toLanguage, setToLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    setError('');
    setTranslation('');
    try {
      const res = await axios.get('http://localhost:5000/api/words');
      const words = Array.isArray(res.data) ? res.data : [];

      // If translating from Spanish -> English, find exact match on spanish
      const term = inputText.trim().toLowerCase();
      if (!term) {
        setError('Please enter a word to translate.');
        setLoading(false);
        return;
      }

      let found = null;
      if (fromLanguage.toLowerCase().includes('spanish') && toLanguage.toLowerCase().includes('english')) {
        found = words.find((w) => (w.spanish || '').toLowerCase() === term);
        if (found) setTranslation(found.english);
      } else if (fromLanguage.toLowerCase().includes('english') && toLanguage.toLowerCase().includes('spanish')) {
        found = words.find((w) => (w.english || '').toLowerCase() === term);
        if (found) setTranslation(found.spanish);
      } else {
        // fallback: try to match either field and show the other
        found = words.find((w) => (w.spanish || '').toLowerCase() === term || (w.english || '').toLowerCase() === term);
        if (found) {
          setTranslation(fromLanguage.toLowerCase().includes('spanish') ? found.english : found.spanish);
        }
      }

      if (!found) {
        setTranslation('No translation found in dictionary.');
      }
    } catch (err) {
      console.error(err);
      setError('Error contacting backend. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearInput = () => setInputText('');
  const handleCopy = () => navigator.clipboard.writeText(translation || '');
  const swapLanguages = () => {
    setFromLanguage((prev) => {
      setToLanguage(prev);
      return toLanguage;
    });
  };

  return (
    <main className="flex-1 mt-10 px-4">
      <div className="flex flex-wrap justify-between gap-3 p-4 text-center">
        <div className="flex w-full flex-col gap-3 items-center">
          <p className="text-[#111618] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Translate from {fromLanguage} to {toLanguage}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal max-w-lg">
            Instantly translate text between languages. Simple, fast, and accurate for your everyday needs.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4 px-4 py-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="from-language">Translate From</label>
          <select id="from-language" value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)} className="form-select w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111618] dark:text-white focus:border-primary focus:ring-primary">
            <option>Spanish</option>
            <option>English</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <button onClick={swapLanguages} className="flex items-center justify-center size-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mx-auto mt-4 md:mt-0">
          <span className="material-symbols-outlined">swap_horiz</span>
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="to-language">Translate To</label>
          <select id="to-language" value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} className="form-select w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[#111618] dark:text-white focus:border-primary focus:ring-primary">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="flex flex-col">
          <div className="relative flex flex-col min-w-40 flex-1">
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={`Enter ${fromLanguage} text here...`} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111618] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 min-h-60 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal" />
            <div className="absolute top-3 right-3">
              <button onClick={handleClearInput} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"><span className="material-symbols-outlined text-xl">close</span></button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">{inputText.length} / 5000</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleTranslate} disabled={loading || !inputText} className="flex w-full md:w-auto min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"><span className="truncate">{loading ? 'Translating...' : 'Translate'}</span></button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="relative flex flex-col min-w-40 flex-1">
            <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 min-h-60 p-4 text-[#111618] dark:text-gray-200 text-base font-normal leading-normal">{translation || 'Translation will appear here...'}</div>
            <div className="absolute top-3 right-3">
              <button onClick={handleCopy} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"><span className="material-symbols-outlined text-xl">content_copy</span></button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </main>
  );
};

export default TranslatorForm;