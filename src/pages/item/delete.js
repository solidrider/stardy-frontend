import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../utils/useAuth";
import { axiosClient } from "../../services/axiosClient";

const DeleteItem = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "編集ページ";

    const getSingleItem = async () => {
      const response = await axiosClient.get(`/item/${params.id}`)
      setTitle(response.data.singleItem.title);
      setPrice(response.data.singleItem.price);
      setImage(response.data.singleItem.image);
      setDescription(response.data.singleItem.description);
      setEmail(response.data.singleItem.email);
    };
    getSingleItem();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.delete(`/item/delete/${params.id}`)
      alert(response.data.message);
    } catch (err) {
      alert("アイテム削除失敗");
    }
  };

  const loginUser = useAuth();

  if (loginUser === email) {
    return (
      <div className="delete-page">
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          {image && <img src={image} alt="item" />}
          <h3>¥{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
