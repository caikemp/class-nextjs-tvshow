import "./styles.module.scss";

const ThumbnailWithSass = ({ imageUrl, caption }) => (
  <div className="thumbnail">
    <img src={imageUrl} title={caption} />
    <h4 className="thumbnail_caption">{caption}</h4>
  </div>
);

ThumbnailWithSass.defaultProps = {
  imageURL: "//via.placeholder.com/210x295?text=?",
};

export default ThumbnailWithSass;
