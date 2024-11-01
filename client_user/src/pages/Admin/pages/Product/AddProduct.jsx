import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { message } from 'antd';
import { openNotification } from '../../../../assets/hooks/notification';
import ModaSize from "./ModalSize"
import { useSelector, useDispatch } from 'react-redux';
import { selectedProduct } from '../../redux/Product/productSlice';
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 400px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  & > label {
    flex: 0.3;
    margin-right: 10px;
  }

   & > input, & > select {
    flex: 0.7; /* Chiếm 70% không gian */
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  flex: 1;

  &.back {
    background-color: magenta;
    margin-right: 10px;
  }

  &.add {
    background-color: green;
  }
`;
const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const AddProduct = () => {
  const dispatch = useDispatch()
  const selectProduct = useSelector(state => state.product.selectProduct)
  const [productData, setProductData] = useState({
    name: selectProduct.name ?? '',
    price: selectProduct.price ?? 0,
    description: selectProduct.description ?? '',
    productSizes: [],
    category: selectProduct.category?._id ?? '',
    supplier: selectProduct.supplier?._id ?? '',
    status: 'còn hàng',
  });
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const [productSizes, setSizes] = useState(selectProduct.productSizes ?? [])
  const [categories, setCategories] = useState(selectProduct.productSizes ?? []);
  const [suppliers, setSuppliers] = useState([]);
  const [images, setImages] = useState(selectProduct.image ?? []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, suppliersRes] = await Promise.all([
          axios.get('http://localhost:3000/category/get-categorylist'),
          axios.get('http://localhost:3000/supplier/list-supplier')
        ]);
        setCategories(categoriesRes.data.categories);
        setSuppliers(suppliersRes.data.suppliers);
      } catch (error) {
        message.error('Failed to load categories or suppliers');
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (e) => {
    e.stopPropagation()
    const upload_preset = "uploat_data"
    const formData = new FormData()
    const files = e.target.files
    for (let i of files) {
      formData.append("file", i)
      formData.append('upload_preset', upload_preset)

      const responseImage = await fetch("https://api.cloudinary.com/v1_1/da5mlszld/image/upload", {
        method: "POST",
        body: formData
      })
      const objectImage = await responseImage.json()
      setImages(pre => [
        ...pre,
        objectImage.url
      ])
      console.log(objectImage)
    }
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...productData,
      image: images,
      productSizes: productSizes
    }
    if (selectProduct._id) {
      axios.post(`http://localhost:3000/products/update-product/${selectProduct._id}`, formData)
        .then(res => res.data)
        .then(data => {
          openNotification(true, 'Cập sản phẩm thành công', "");
          navigate("/admin")
        })
        .catch(err => {
          openNotification(false, 'Cập nhật sản phẩm không thành công', "");

        })
    } else {
      try {
        await axios.post('http://localhost:3000/products/create-product', formData);
        openNotification(true, 'Thêm sản phẩm thành công', "");
        navigate("/admin")
      } catch (error) {
        openNotification(false, 'Thêm sản phẩm không thành công', "");
      }
    }

  };
  const handleDelete = async (item) => {
    setImages(pre => pre.filter(image => image !== item))
  }


  return (
    <Container>
      <div className='h-auto'>
        <input type="file" multiple onChange={handleImageUpload} />
        <div className='flex max-w-[300px] flex-wrap'>
          {images?.map(item => (
            <div key={item} className="relative w-[150px] h-[150px] p-[5px]">
              <Image src={item} className='object-cover rounded-md' />
              <button
                className="absolute top-2 right-2 bg-red-500 text-center items-center text-white rounded-full p-1 w-[20px] h-[20px] flex  justify-center"
                onClick={() => handleDelete(item)}
              >
                x
              </button>
            </div>
          ))}
        </div>

      </div>


      <Form onSubmit={handleSubmit}>
        <h1>{selectProduct.name ? "Cập nhật sản phẩm" : "Thêm Sản Phẩm"}</h1>

        <InputField>
          <Label>Tên sản phẩm:</Label>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên sản phẩm"
            required
          />
        </InputField>
        <InputField>
          <Label>Đơn giá:</Label>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Nhập giá sản phẩm"
            required
          />
        </InputField>

        <InputField>
          <Label>Mô tả:</Label>
          <Input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Nhập mô tả"
            required
          />
        </InputField>

        <InputField>
          <Label>Size:</Label>
          <Link className='flex-[0.7] w-full'>
            <button
              className='w-[100%]  h-[49px] bg-white border-[#ccc] text-black font-medium'
              value={productData.size}
              onClick={() => setVisible(true)}
            >Nhập size</button>
          </Link>

        </InputField>

        <InputField>
          <Label>Danh mục:</Label>
          <Select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </Select>
        </InputField>

        <InputField>
          <Label>Nhà cung cấp:</Label>
          <Select
            name="supplier"
            value={productData.supplier}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>{supplier.companyName}</option>
            ))}
          </Select>
        </InputField>

        <InputField>
          <Label>Trạng thái:</Label>
          <Input
            type="text"
            name="status"
            value={productData.status}
            onChange={handleInputChange}
            placeholder="Nhập trạng thái"
          />
        </InputField>

        <InputField>
          <Label>Ngày nhập:</Label>
          <Input
            type="date"
            name="updatedAt"
            value={new Date().toISOString().substring(0, 10)} // Tự động là ngày hiện tại
            disabled // Vô hiệu hóa input
          />
        </InputField>

        <ButtonContainer>
          <Link to="/admin" >
            <Button className="back" onClick={() => dispatch(selectedProduct({}))}>Back</Button>
          </Link>
          <Button type="submit" className="add">{selectProduct.name ? "Cập nhật sản phẩm" : "Thêm Sản Phẩm"}</Button>
        </ButtonContainer>
      </Form>
      <ModaSize
        visible={visible}
        close={() => setVisible(false)}
        setSizes={setSizes}
        productSizes={productSizes}
        idPro={selectProduct._id}
      ></ModaSize>
    </Container>
  );
};

export default AddProduct;
