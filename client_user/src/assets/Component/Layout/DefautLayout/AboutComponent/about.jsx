import React from 'react';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-indigo-950 mb-6">Giới Thiệu</h1>
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Chúng tôi là một công ty chuyên cung cấp các sản phẩm chất lượng cao. Với mục tiêu đem đến cho khách hàng trải nghiệm tuyệt vời, chúng tôi không ngừng nỗ lực để mang lại các sản phẩm tốt nhất và dịch vụ khách hàng hoàn hảo.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">Tầm Nhìn</h2>
          <p className="text-lg text-gray-700 mb-6">
            Chúng tôi hướng đến việc trở thành nhà cung cấp hàng đầu trong lĩnh vực của mình, xây dựng mối quan hệ lâu dài với khách hàng và đối tác.
          </p>

          <h2 className="text-2xl font-semibold text-indigo-950 mb-4">Sứ Mệnh</h2>
          <p className="text-lg text-gray-700">
            Chúng tôi cam kết cung cấp các sản phẩm chất lượng, dịch vụ nhanh chóng và hỗ trợ khách hàng 24/7, mang đến sự hài lòng tuyệt đối cho tất cả khách hàng.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
