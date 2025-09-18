import { test, expect, Page } from '@playwright/test';

test('test đầu tiên - truy cập Google', async ({ page }) => {
  // Mở trang Google
  await page.goto('https://google.com');
  
  // Kiểm tra title có chứa "Google"
  await expect(page).toHaveTitle(/Google/);
  
  
  // Tìm ô search và nhập từ khóa
  await page.fill('textarea[name="q"]', 'playwright');
  
  // Nhấn Enter để search
  await page.press('textarea[name="q"]', 'Enter');
   // Đợi kết quả xuất hiện
  await page.waitForSelector('h3');
  
  // Kiểm tra có kết quả search
  const results = await page.locator('h3').count();
  expect(results).toBeGreaterThan(0);
 
});
