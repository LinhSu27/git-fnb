import { test, expect, Page } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://fnb.kiotviet.vn/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Đăng nhập/);
});
test('Đăng nhập KiotViet', async ({ page }) => {
  // Thông tin đăng nhập - thay đổi theo thông tin thực của bạn
  const loginData = {
    storeName: 'testfnbdev41',    // Tên gian hàng
    username: 'admin',          // Tên đăng nhập  
    password: '0909'           // Mật khẩu
  };
  
  // Bước 2: Click nút Đăng nhập
    await page.getByRole('link', { name: 'Quên mật khẩu' }).click();