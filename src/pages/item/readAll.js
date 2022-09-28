import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";

const ReadAll = () => {
  const [allItems, setAllItems] = useState();
  useEffect(() => {
    const getAllItems = async () => {
      const response = await axiosClient.get("/");
      setAllItems(response.data);
    };
    getAllItems();
  }, []);
  return (
    <div>
      <div>
        {allItems &&
          allItems.allItems.map((item) => (
            <Link to={`/item/${item._id}`} key={item._id}>
              <img src={require(`../../images${item.image}`)} alt="item" />
              <div>
                <h2>{item.price}</h2>
                <h3>{item.title}</h3>
                <p>{item.description.substring(0, 80)}...</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ReadAll;
