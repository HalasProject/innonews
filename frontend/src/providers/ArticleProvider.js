import React, { useState, createContext } from "react";
import { GET_ALL_ARTICLES } from "../utils/api";
import axiosInstance from "../utils/axiosInstance";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");
  const [sources, setSources] = useState({
    nyt: true,
    guardian: true,
    newsapi: true,
  });
  const [search, setSearch] = useState("");

  const fetchArticles = async () => {
    setShowLoader(true);
    const { data: articlesData } = await axiosInstance.get(GET_ALL_ARTICLES, {
      params: {
        search: search,
        from_date: "",
        to_date: "",
        category: category,
        source: sources,
      },
    });

    setArticles(articlesData);
    setShowLoader(false);
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        fetchArticles,
        category,
        setCategory,
        showLoader,
        sources,
        setSources,
        search,
        setSearch,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
