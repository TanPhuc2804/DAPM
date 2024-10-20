import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { openNotification } from '../../../../assets/hooks/notification';
import { formatCurrency } from '../../../../assets/Function/formatCurrency'
import { fetchData,updateTemp } from '../../redux/select/selectOrder';
import { Spin } from 'antd';
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

const Select = styled.select`
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
  useEffect(() => {
    axios.get("http://localhost:3000/order/all-order")
      .then(res => res.data)
      .then(data => {
        dispatch(fetchData(data.order))
        dispatch(updateTemp(data.order))
      })
      .catch(err => {
        openNotification(false, "Lấy dữ liệu thất bạt", err.response.data.message)
      })
  }, [])
  // xử lý dữ liệu
  const orders =useSelector(state => state.orders.orders)
  let tempOrder =  useSelector(state => state.orders.temporder)
  let productOrder = tempOrder.map(item => item.order_details).flat()
  let products = Object.values(productOrder.reduce((acc, current) => {
    const { _idProduct } = current
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
    const startDate = dayjs(String(daySearch.startDay), "DD/MM/YYYY");
    const endDate = dayjs(String(daySearch.endDay), "DD/MM/YYYY");
    if(endDate.isBefore(startDate)){
      openNotification(false,"Ngày bắt đầu phải lớn hơn ngày kết thúc","")
      return
    }
    tempOrder = orders.filter(order => {
      const orderDate = dayjs(String(order.createdAt));
     
      return orderDate.isBetween(startDate, endDate, null, '[]')
    })
    if(tempOrder.length>0){
      dispatch(updateTemp(tempOrder))
    }else{
      dispatch(updateTemp(tempOrder))
      openNotification(false,"Không có đơn hàng nào vào"+daySearch.startDay+" - "+daySearch.endDay,"")
    }
  }

  const hanldeChange = (e) => {
    const { name, value } = e.target
    setDaySearch(pre => ({
      ...pre,
      [name]: dayjs(value).format("DD/MM/YYYY")
    }))

  }

  return (
    <Container>
      <Header>Báo cáo doanh thu</Header>
      <StyledHr />
      <ButtonGroup>
        <Button primary>Thời Gian</Button>
        <Button>Sản phẩm</Button>
      </ButtonGroup>
      <StyledHr />
      <FilterSection>
        <Label>Loại thời gian</Label>
        <Select>
          <option>Báo cáo theo ngày</option>
          <option>Báo cáo theo tháng</option>
        </Select>
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
              <tr key={item._idProduct}>
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
