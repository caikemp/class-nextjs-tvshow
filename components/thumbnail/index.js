import Link from "next/link";

const Thumbnail = ({
  imageUrl = "https://via.placeholder.com/210x295?text=?",
  caption,
  href = "",
  as = "",
  small = false,
}) => (
  <Link href={href} as={as}>
    <a>
      <div className="thumbnail">
        <img src={imageUrl} title={caption} className="thumbnail_image" />
        <h4 className="thumbnail_caption">{caption}</h4>
        <style jsx>{`
          .thumbnail_image {
            width: ${small ? "100px" : "100%"};
          }

          .thumbnail_caption {
            text-align: center;
            padding: 10px;
          }
        `}</style>
      </div>
    </a>
  </Link>
);

export default Thumbnail;
