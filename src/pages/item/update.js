import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../utils/useAuth";
import { axiosClient } from "../../services/axiosClient";

const UpdateItem = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "編集ページ";

    const getSingleItem = async () => {
      const response = await axiosClient.get(`/item/${params.id}`);
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
      const response = await axiosClient.put(`/item/update/${params.id}`, {
        title: title,
        price: price,
        image: image,
        description: description,
      });
      alert(response.data.message);
    } catch (err) {
      alert("アイテム編集失敗");
    }
  };

  const loginUser = useAuth();

  if (loginUser === email) {
    return (
      <div>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            rows="15"
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;
