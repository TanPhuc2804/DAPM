import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-background text-gray-200 bg-[#224F34] p-6 max-w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="footer-brand flex flex-col items-start">
            <h2 className="footer-brand-name text-lg font-bold mb-2">
              F<span className="text-orange-500">M</span>EN Store
            </h2>
            <div className="footer-social-media flex space-x-4">
              <a href="#" className="social-icon text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="social-icon text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>


          <div className="footer-navigation flex flex-col items-start">
            <h2 className="navigation-title text-lg font-bold mb-2">Liên kết nhanh</h2>
            <a href="/" className="navigation-link text-gray-400 hover:text-white transition-colors duration-300 mb-1">Trang chủ</a>
            <a href="/products" className="navigation-link text-gray-400 hover:text-white transition-colors duration-300 mb-1">Sản phẩm</a>
            <a href="/about" className="navigation-link text-gray-400 hover:text-white transition-colors duration-300 mb-1">Giới thiệu</a>
            <a href="/contact" className="navigation-link text-gray-400 hover:text-white transition-colors duration-300">Liên hệ</a>
          </div>


          <div className="footer-contact flex flex-col items-start">
            <h2 className="contact-title text-lg font-bold mb-2">Địa chỉ cửa hàng</h2>
            <p className="contact-address text-gray-400 mb-2">123 Đường ABC, Quận 1, TP.HCM</p>
            <iframe
              className="w-full h-32 rounded-md border border-gray-400 mb-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.063860300326!2d106.69107731529235!3d10.776167962329886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175281f9b6e6f77%3A0x9d6a7f3e10bcbba6!2s123%20%C4%90%C6%B0%E1%BB%9Dng%20ABC%2C%20Qu%E1%BB%8Dnh%201%2C%20TP.HCM!5e0!3m2!1sen!2s!4v1649388706906!5m2!1sen!2s"
              title="Google Maps Location"
              allowFullScreen=""
              loading="lazy"
            />
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-map-link text-gray-400 hover:text-white transition-colors duration-300"
            >
              Xem trên Google Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
