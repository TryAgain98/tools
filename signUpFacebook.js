import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800, slowMo: 50 },
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.facebook.com/reg", {
    waitUntil: "networkidle2",
  });

  // Điền thông tin đăng ký
  await page.type("input[name=firstname]", "Phuong", { delay: 100 });
  await page.type("input[name=lastname]", "Nguyen", { delay: 100 });
  await page.type("input[name=reg_email__]", "phuong.nguyen9@sotatek.com", {
    delay: 100,
  }); // Thay bằng email hợp lệ
  await page.type(
    "input[name=reg_email_confirmation__]",
    "phuong.nguyen9@sotatek.com",
    { delay: 100 }
  ); // Thay bằng email hợp lệ
  await page.type("input[name=reg_passwd__]", "yourpassword", { delay: 100 });

  // Chọn ngày sinh
  await page.select("select[name=birthday_day]", "15");
  await page.select("select[name=birthday_month]", "6"); // Tháng 6
  await page.select("select[name=birthday_year]", "1990");

  // Chọn giới tính
  await page.click('input[value="2"]'); // Nam

  // Nhấn nút Đăng ký
  await page.click("button[name=websubmit]");

  // Chờ một khoảng thời gian để xem kết quả
  //   await page.waitForTimeout(5000);

  // Đóng trình duyệt
  //   await browser.close();
})();
