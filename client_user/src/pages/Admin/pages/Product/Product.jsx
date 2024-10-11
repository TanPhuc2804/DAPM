import React from 'react'
import ViewProduct from './ViewProduct'

const Product = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', padding: '20px', backgroundColor: '#ffffff' }}>
      <ViewProduct title="Áo" color="red" />
      <ViewProduct title="Quần" color="green" />
      <ViewProduct title="Giày" color="yellow" />
      <ViewProduct title="Phụ kiện" color="cyan" />

    </div>
  )
}

export default Product