import puppeteer from "puppeteer";

const accounts = [
  { email: "phuong.nguyen9@sotatek.com", password: "yourpassword" },
];

const postURL =
  "https://www.facebook.com/groups/thanhlymuabandocusvhanoi/posts/1004977241341796/?comment_id=1005024564670397&reply_comment_id=1005027128003474&notif_id=1716283355043857&notif_t=group_comment"; // Thay thế bằng URL bài viết của bạn
const commentText = "Để lại cho em 600 được không ạ"; // Nội dung bình luận

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  for (const account of accounts) {
    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/login");

    // Đăng nhập vào Facebook
    await page.type("#email", account.email);
    await page.type("#pass", account.password);
    await page.click('button[name="login"]');
    await page.waitForNavigation();

    // Truy cập vào bài viết
    await page.goto(postURL);

    // Thực hiện hành động like
    const likeButtonSelector = 'div[aria-label="Like"]';
    await page.waitForSelector(likeButtonSelector);
    await page.click(likeButtonSelector);

    // Thực hiện hành động comment
    const commentBoxSelector =
      'div[aria-label="Write a comment"] div[contenteditable="true"]';
    await page.waitForSelector(commentBoxSelector);
    await page.type(commentBoxSelector, commentText);
    await page.keyboard.press("Enter");

    // Đăng xuất
    await page.goto("https://www.facebook.com/logout");

    // Đóng trang
    await page.close();
  }

  await browser.close();
})();
