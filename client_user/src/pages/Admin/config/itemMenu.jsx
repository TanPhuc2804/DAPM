import {
    UnorderedListOutlined,
    ProductOutlined,
    DashboardOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt,faTicket } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}


export const items = [
    getItem("DashBoard", "revenue", <DashboardOutlined />),
    getItem("Sản phẩm", "products", <ProductOutlined />),
    getItem("Đơn hàng", "orders", <FontAwesomeIcon icon={faReceipt} />),
    getItem("Nhân viên", "staffs", <TeamOutlined />),
    getItem("Khách hàng", "customers", <TeamOutlined />),
    getItem("Nhà cung cấp", "suppliers", <FontAwesomeIcon icon={faBuilding} />),
    getItem("Mã giảm giá", "vouchers", <FontAwesomeIcon icon={faTicket} />)

]