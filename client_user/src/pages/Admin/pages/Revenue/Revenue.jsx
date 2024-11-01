import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { openNotification } from '../../../../assets/hooks/notification';
import { formatCurrency } from '../../../../assets/Function/formatCurrency'
import { fetchData, updateTemp, filterOrder } from '../../redux/select/selectOrder';
import { Spin, Select } from 'antd';
// Styled components cho bố cục và các thành phần giao diện
const Container = styled.div`
  padding: 20px;
  background-color:#ffffff;
`;

const Header = styled.h2`
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-top : 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background-color: ${props => (props.primary ? '#00BFFF' : '#BEBEBE')};
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select1 = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: 2px solid:black;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: magenta;
  font-weight: bold;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  margin-top: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 2px solid black;
  padding: 10px;
  background-color: #dcdcdc;
`;

const TableData = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: center;
`;
const StyledHr = styled.hr`
  border: none;
  border-top: 1px solid black;
  width: 100%;
`;
const Revenue = () => {
  dayjs.extend(isBetween);
  const dispatch = useDispatch()
  const [daySearch, setDaySearch] = useState({
    startDay: "",
    endDay: ""
  })
  const [cate, setCate] = useState("Defauld")
  const [options, setOption] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3000/order/all-order")
      .then(res => res.data)
      .then(data => {
        dispatch(fetchData(data.order))
        dispatch(updateTemp(data.order))
      })
      .catch(err => {
        console.log(err.response.data.message)
        openNotification(false, "Lấy dữ liệu thất bạt", err.response.data.message)
      })

    axios.get("http://localhost:3000/category/get-categorylist")
      .then(res => res.data)
      .then(data => {
        const cate = data.categories.map(item => ({
          value: item._id,
          label: item.name
        }))
        cate.push({
          value: "Defauld",
          label: "Mặc định"
        })
        setOption(cate)
      })
      .catch(err => console.log(err))

  }, [])
  // xử lý dữ liệu
  const orders = useSelector(state => state.orders.orders)
  let tempOrder = useSelector(state => state.orders.temporder)
  let productOrder = tempOrder.map(item => item.order_details ?? item).flat()
  let products = Object.values(productOrder.reduce((acc, current) => {
    const _idProduct = current._idProduct._id ?? current._idProduct
    if (acc[_idProduct]) {
      acc[_idProduct].quantity += current.quantity;
    } else {
      acc[_idProduct] = { ...current };
    }
    return acc
  }, {}))
  //tính tổng tiền
  const totalPrice = useMemo(() => {
    const result = products.reduce((total, current) => {
      return total + (current.price * current.quantity)
    }, 0)

    return result
  }, [products])

  const hanldeSearch = (e) => {
    console.log(cate)
    const startDate = dayjs(String(daySearch.startDay), "DD/MM/YYYY");
    const endDate = dayjs(String(daySearch.endDay), "DD/MM/YYYY");
    if (endDate.isBefore(startDate)) {
      openNotification(false, "Ngày bắt đầu phải lớn hơn ngày kết thúc", "")
      return
    }

    tempOrder = orders.filter(order => {
      const orderDate = dayjs(String(order.createdAt));
      if (startDate.isSame(endDate, 'day')) {
        return orderDate.isSame(startDate, 'day');
      }
      return orderDate.isBetween(startDate, endDate, null, '[]')
    })

    // search product for category 
    if (cate != "Defauld") {
      const getCateProduct = []
      tempOrder.forEach(order => {
        order.order_details.forEach(detail => {
          if (detail._idProduct.category == cate) {
            getCateProduct.push(detail)
          }
        })
      })
      tempOrder = getCateProduct
    }
    if (tempOrder.length > 0) {
      dispatch(updateTemp(tempOrder))
    } else {
      dispatch(updateTemp(tempOrder))
      openNotification(false, "Không có đơn hàng nào vào" + daySearch.startDay + " - " + daySearch.endDay, "")
    }
  }
  const hanldeChange = (e) => {
    const { name, value } = e.target
    setDaySearch(pre => ({
      ...pre,
      [name]: dayjs(value).format("DD/MM/YYYY")
    }))

  }

  // const getProductByCate = (orders, categoryId) => {
  //   let productByCate = []

  //   if(categoryId === "Defauld"){
  //     return orders
  //   }else{
  //     productByCate = products.filter(item =>item._idProduct.category == categoryId)

  //     return productByCate
  //   }

  // }

  const filterOrderCate = async (value) => {
    setCate(value)
  }

  const handleRefresh = () => {
    setDaySearch({
      startDay: "",
      endDay: ""
    })
    setCate("Defauld")
    dispatch(updateTemp(orders))
  }

  return (
    <Container>
      <Header>Báo cáo doanh thu</Header>
      <StyledHr />
      <ButtonGroup className='flex items-center justify-between mx-[10px]'>
        <div>
          <Button primary>Thời Gian</Button>
          <Select
            className='w-[150px] ml-[20px]'
            value={cate}
            options={options}
            onChange={(value) => filterOrderCate(value)}
          >
            Sản phẩm</Select>
        </div>

        <Button primary onClick={handleRefresh}> Tải lại trang </Button>
      </ButtonGroup>
      <StyledHr />
      <FilterSection>
        <Label>Loại thời gian</Label>
        <Select1>
          <option>Báo cáo theo ngày</option>
          <option>Báo cáo theo tháng</option>
        </Select1>
        <Label>Ngày bắt đầu</Label>
        <Input type="date" name='startDay' onChange={hanldeChange} />
        <Label>Ngày kết thúc</Label>
        <Input type="date" name='endDay' onChange={hanldeChange} />
        <SearchButton onClick={hanldeSearch}>Tìm kiếm</SearchButton>
      </FilterSection>
      <StyledHr />
      <StatsContainer>
        <StatItem>
          <p>Doanh thu</p>
          <p>{formatCurrency(totalPrice)}</p>
        </StatItem>
      </StatsContainer>
      <StyledHr />
      {products.length > 0 ?
        <Table>
          <thead>
            <tr>
              <TableHeader>STT</TableHeader>
              <TableHeader>Tên sản phẩm</TableHeader>
              <TableHeader>Giá tiền</TableHeader>
              <TableHeader>Số lượng</TableHeader>
              <TableHeader>Doanh thu</TableHeader>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={item._idProduct._id}>
                <TableData>{index + 1}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>{formatCurrency(item.price)}</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>{formatCurrency(item.quantity * item.price)}</TableData>
              </tr>
            ))}
          </tbody>
        </Table>
        : <Spin></Spin>
      }

    </Container>
  );
};

export default Revenue;
