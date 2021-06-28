import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { API_URL } from "../config/constant.js";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  /**
   * 상품 상세 정보 가져오기 함수
   *
   */
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);
  // 비동기 통신이므로 처음에 useState의 product는 비어있음. (비동기이므로)

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다...</h1>;
  }

  /**
   * 바로 구매하기 버튼 클릭 이벤트 함수.
   *
   */
  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt="상품 사진" />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt="프로필 사진" />
        <span>{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}원</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          바로 구매하기
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
    </div>
  );
}

export default ProductPage;
