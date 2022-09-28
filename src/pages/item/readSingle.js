import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../../services/axiosClient";

const ReadSingleItem = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const getSingleItem = async () => {
      const response = await axiosClient.get(`/item/${params.id}`);
      console.log(response.data);
      setTitle(response.data.singleItem.title);
      setPrice(response.data.singleItem.price);
      setImage(response.data.singleItem.image);
      setDescription(response.data.singleItem.description);
    };
    getSingleItem();
  }, [params.id]);
  return (
    <div>
      <div>
        {image && <img src={require(`../../images${image}`)} alt="item" />}
      </div>
      <div>
        <h1>{title}</h1>
        <h2>{price}</h2>
        <hr />
        <p>{description}</p>
        <div>
          <Link to={`/item/update/${params.id}`}>アイテム編集</Link>
          <Link to={`/item/delete/${params.id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;
