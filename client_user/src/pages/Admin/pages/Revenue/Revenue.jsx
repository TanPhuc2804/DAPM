import React from 'react';
import styled from 'styled-components';

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
        <Input type="date" />
        <Label>Ngày kết thúc</Label>
        <Input type="date" />
        <SearchButton>Tìm kiếm</SearchButton>
      </FilterSection>
      <StyledHr />
      <StatsContainer>
        <StatItem>
          <p>6.897.999</p>
          <p>Doanh thu</p>
        </StatItem>
        <StatItem>
          <p>4.200.890</p>
          <p>Tổng vốn</p>
        </StatItem>
        <StatItem>
          <p>0</p>
          <p>Bị trả</p>
        </StatItem>
        <StatItem>
          <p>2.697.109</p>
          <p>Lợi nhuận</p>
        </StatItem>
      </StatsContainer>
      <StyledHr />
      <Table>
        <thead>
          <tr>
            <TableHeader>STT</TableHeader>
            <TableHeader>Tên sản phẩm</TableHeader>
            <TableHeader>Số lượng</TableHeader>
            <TableHeader>Doanh thu</TableHeader>
            <TableHeader>Vốn</TableHeader>
            <TableHeader>Lợi nhuận</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableData>01</TableData>
            <TableData>Áo ba lỗ</TableData>
            <TableData>86</TableData>
            <TableData>4.730.000</TableData>
            <TableData>3.870.000</TableData>
            <TableData>860.000</TableData>
          </tr>
          <tr>
            <TableData>02</TableData>
            <TableData>Áo Hoodie</TableData>
            <TableData>4</TableData>
            <TableData>2.167.999</TableData>
            <TableData>330.890</TableData>
            <TableData>1.837.109</TableData>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Revenue;
