import "./PlaceList.css";
import PlaceItem from "./Placeitem";
import Card from "../../Shared/Components/UIElements/Card";

const PlaceList = (props) => {
    if (props.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No Places found. maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};

export default PlaceList;
