import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import nyc_logo from "../images/new_york_time.png";
import newsapi_logo from "../images/news_api.png";
import theguardian_logo from "../images/the_guardian.png";
function ArticleBox({
  article: {
    title,
    image,
    source,
    web_url,
    pub_date,
    word_count,
    time_to_read,
  },
}) {
  const imageSource = (source) => {
    switch (source) {
      case "nyc":
        return nyc_logo;
      case "newsapi":
        return newsapi_logo;
      case "theguardian":
        return theguardian_logo;
      default:
        return "https://place-hold.it/120x120";
    }
  };
  return (
    <div
      className="w-96 border border-gray-600 shadow-xl bg-gray-700 
        rounded-xl flex flex-col items-start p-8 space-y-4"
    >
      <div id="article_icon" className="flex flex-row justify-between w-full">
        <img
          className="rounded-full object-contain w-12 h-12"
          src={imageSource(source)}
          alt={source}
        ></img>
        <a
          href={web_url}
          target="_blank"
          className="bg-purple-500 rounded-md space-x-3 flex flex-row items-center justify-between p-3"
        >
          <h1 className="text-white text-xs font-mono ">Read Article</h1>
          <ArrowTopRightOnSquareIcon color="white" width={16} />
        </a>
      </div>
      <a
        id="article_text"
        href={web_url}
        target="_blank"
        className="text-xl text-gray-200 font-semibold"
      >
        <h1>{title}</h1>
      </a>
      <div id="article_time" className="text-gray-400 text-small">
        <small>{pub_date}</small>{" "}
        {time_to_read !== "N/A" && <small>- {time_to_read}m read time</small>}
      </div>
      <div
        id="article_image"
        className="bg-gray-600/50 flex justify-center items-center  h-44 w-full rounded-lg"
      >
        {image && (
          <img
            loading="lazy"
            className="object-cover w-full h-full rounded-lg"
            src={image}
          />
        )}
        {!image && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
            <small className="text-gray-200 font-extralight">
              Article without image
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleBox;
