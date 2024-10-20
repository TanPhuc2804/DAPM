export function formatCurrency(value) {
    // Chuyển đổi số thành chuỗi và định dạng
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedValue} VNĐ`;
}

