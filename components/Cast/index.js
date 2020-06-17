import Thumbnail from "../thumbnail";
const Cast = ({ casts = [] }) => {
  const renderCast = () => {
    return casts.map((cast, key) => {
      const { person, character } = cast;
      return (
        <li key={key} className="cast_list_item">
          <Thumbnail
            small
            caption={`${person.name} (${character.name})`}
            imageUrl={person.image?.medium}
          />
        </li>
      );
    });
  };

  return (
    <div className="cast">
      <h3>Cast</h3>
      <ul className="cast_list">{renderCast()}</ul>
      <style jsx>{`
        .cast_list {
          padding: 0;
          margin: 0;
          list-style-type: none;
          display: flex;
          overflow: auto;
        }

        :global(.cast_list_item) {
          margin: 0 0 0 10px;
        }
      `}</style>
    </div>
  );
};

export default Cast;
