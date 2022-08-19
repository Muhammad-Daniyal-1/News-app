import React from "react";

const NewsItem = (props) => {
  let { title, description, imgurl, newsurl, author, date } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img
          src={
            !imgurl
              ? "https://assets2.cbsnewsstatic.com/hub/i/r/2022/08/09/13bd7701-e870-491b-9af2-773791162371/thumbnail/1200x630/1987da864adbaca03ae8a03e0ceb44e0/gettyimages-1328148474.jpg"
              : imgurl
          }
          className="card-img-top"
          alt="..."
          style={{ height: "12rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsurl} target="blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
