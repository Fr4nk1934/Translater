import * as Word from "../models/wordModel.js";

export const getWords = async (req, res) => {
  const words = await Word.getAllWords();
  res.json(words);
};

export const createWord = async (req, res) => {
  const { spanish, english } = req.body;
  const word = await Word.addWord(spanish, english);
  res.status(201).json(word);
};

export const editWord = async (req, res) => {
  const { id } = req.params;
  const { spanish, english } = req.body;
  await Word.updateWord(id, spanish, english);
  res.json({ message: "Updated successfully" });
};

export const removeWord = async (req, res) => {
  const { id } = req.params;
  await Word.deleteWord(id);
  res.json({ message: "Deleted successfully" });
};
