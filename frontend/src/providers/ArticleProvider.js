import dayjs from "dayjs";
import React, { useState, createContext } from "react";
import { GET_ALL_ARTICLES, GET_FEED } from "../utils/api";
import axiosInstance from "../utils/axiosInstance";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const categories = [
    "*",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const defaultSources = {
    nyt: true,
    theguardian: true,
    newsapi: false,
  };

  const defaultDate = {
    startDate: new Date().setMonth(-9),
    endDate: new Date(),
  };
  const [showLoader, setShowLoader] = useState(false);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("*");
  const [sources, setSources] = useState(defaultSources);
  const [date, setDate] = useState(defaultDate);
  const [search, setSearch] = useState("");

  const fetchArticles = async () => {
    setShowLoader(true);
    try {
      const { data: articlesData } = await axiosInstance.get(GET_ALL_ARTICLES, {
        params: {
          search: search,
          from_date: date.startDate
            ? dayjs(date.startDate).format("YYYY-MM-DD")
            : null,
          to_date: date.endDate
            ? dayjs(date.endDate).format("YYYY-MM-DD")
            : null,
          category: category,
          source: sources,
        },
      });
      setArticles(articlesData);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchFeedArticles = async () => {
    setShowLoader(true);
    try {
      const { data: articlesData } = await axiosInstance.get(GET_FEED);
      setArticles(articlesData);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        fetchArticles,
        categories,
        category,
        setCategory,
        showLoader,
        sources,
        setSources,
        search,
        setSearch,
        fetchFeedArticles,
        setDate,
        date,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
