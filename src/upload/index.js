import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import "./index.css";
import { API_URL } from "../config/constant.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const onCancel = () => {
    history.goBack();
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img
                id="upload-img"
                src={`${API_URL}/${imageUrl}`}
                alt="이미지 업로드"
              />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="이미지 업로드" />
                <span>이미지를 업로드 해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요." }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요."
          />
        </Form.Item>

        <Divider />

        <Form.Item
          label={<div className="upload-label">상품 이름</div>}
          name="name"
          rules={[
            {
              required: true,
              message: "상품 이름을 입력해주세요.",
            },
          ]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요."
          />
        </Form.Item>

        <Divider />

        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요." }]}
        >
          <InputNumber className="upload-price" size="large" defaultValue={0} />
        </Form.Item>

        <Divider />

        <Form.Item
          name="description"
          label={<div className="upload-label">상품소개</div>}
          rules={[{ required: true, message: "상품 소개를 입력해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount={true}
            maxLength={300}
            placeholder="상품 소개를 적어주세요."
          />
        </Form.Item>

        <Form.Item>
          <Button
            id="cancel-button"
            size="large"
            htmlType="reset"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
