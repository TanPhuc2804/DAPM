import React from 'react';

function ChangePasswordForm() {
  return (
    <form className="flex flex-col justify-center pb-6 max-w-full bg-white rounded border border-gray-200 border-solid w-[984px]">
      <h2 className="px-6 py-5 w-full text-3xl font-medium leading-none uppercase bg-white rounded border border-gray-200 border-solid text-zinc-900 max-md:px-5">
        Thay đổi mật khẩu
      </h2>
      <div className="flex flex-col pl-6 mt-6 max-w-full w-[960px] max-md:pl-5">
        <div className="flex flex-col w-full">
          <label htmlFor="current-password" className="text-2xl leading-none text-zinc-900 max-md:max-w-full">
            Mật khẩu hiện tại
          </label>
          <div className="flex flex-col justify-center items-end px-20 py-3 mt-2 w-full bg-white rounded-sm border border-gray-200 border-solid max-md:pl-5 max-md:max-w-full">
            <input type="password" id="current-password" className="w-full bg-transparent border-none" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain w-5 aspect-square" />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-full max-w-[936px] max-md:max-w-full">
          <label htmlFor="new-password" className="text-2xl leading-none text-zinc-900 max-md:max-w-full">
            Mật khẩu mới
          </label>
          <div className="flex flex-wrap gap-10 justify-center px-4 py-3 mt-2 w-full text-sm leading-none bg-white rounded-sm border border-gray-200 border-solid text-slate-500 max-md:max-w-full">
            <input type="password" id="new-password" className="flex-grow bg-transparent border-none" />
            <div>8+ characters</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain shrink-0 w-5 aspect-square" />
          </div>
        </div>
        <div className="flex flex-col mt-4 w-full">
          <label htmlFor="confirm-password" className="text-2xl leading-none text-zinc-900 max-md:max-w-full">
            Xác nhận mật khẩu
          </label>
          <div className="flex flex-col justify-center items-end px-20 py-3 mt-2 w-full bg-white rounded-sm border border-gray-200 border-solid max-md:pl-5 max-md:max-w-full">
            <input type="password" id="confirm-password" className="w-full bg-transparent border-none" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1c244e18483f0d82bcd4076c4971e59a6da9904f719d2b2aa3f7cd20a217e29?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101" alt="" className="object-contain w-5 aspect-square" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start self-start pl-6 mt-6 text-sm font-bold tracking-normal leading-10 text-white uppercase max-md:pl-5">
        <button type="submit" className="gap-2 self-stretch px-6 bg-green-900 rounded-sm max-md:px-5">
          Change Password
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;