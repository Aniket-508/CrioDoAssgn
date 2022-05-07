import Rating from "./Rating";

export default function RestoCard({ data }) {
  const costPerPerson = Math.round(data.costForTwo / 2);
  const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    if (h === 0) {
      return `${m} min`;
    } else if (m === 0) {
      if (h === 1) {
        return `${h} hr`;
      }
      return `${h} hrs`;
    }
    return `${h} hr ${m} min`;
  };

  return (
    <>
      <div
        className={
          data.open
            ? "bg-white overflow-auto p-3 hover:shadow-md hover:cursor-pointer rounded-lg"
            : "grayscale p-3 hover:shadow-md hover:cursor-pointer rounded-lg"
        }
      >
        <div className="w-full">
          {data.image && (
            <img
              className="object-cover h-56 w-full rounded-lg"
              src={data.image}
              alt="restaurantimg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://ninajohansson.se/wp-content/themes/koji/assets/images/default-fallback-image.png";
              }}
            />
          )}
        </div>
        <div className="my-1">
          <h5
            className="text-gray-900 text-xl font-bold mb-1 line-clamp-1"
            title={data.name}
          >
            {data.name}
          </h5>
          <Rating rating={data.rating} reviews={data.reviews} />
          <p className="line-clamp-1" title={data.cuisine.join(", ")}>
            {data.cuisine.join(", ")}
          </p>
          <div className="flex items-center">
            <p>₹{costPerPerson} per person</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
            <p>{convertMinsToHrsMins(data.deliveryTimeInMinutes)}</p>
          </div>
          {data.promoted ? <p className="text-gray-400">Promoted</p> : null}
        </div>
      </div>
    </>
  );
}
