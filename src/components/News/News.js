import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setloading] = useState(true);
  // document.title = `${this.capitalizeFirstLetter(
  //   props.category
  // )} | News`;
  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=721c9b7b9ec14a5db5d1341d703816ce&page=1&pageSize=${props.pageSize}`;
    setloading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
    console.log(articles);
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    console.log(page);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      props.category
    }&apiKey=721c9b7b9ec14a5db5d1341d703816ce&page=${page + 1}&pageSize=${
      props.pageSize
    }`;
    console.log(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles([...articles, ...parsedData.articles]);
    setTotalResults(parsedData.totalResults);
    console.log("hello fetch more data");
  };

  return (
    <div className="container my-3">
      <h1 className="my-3 text-center">
        News | Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <div className="row">
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 20) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 60)
                          : ""
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default News;
