import { expect, it } from "@playwright/test"

it("login", async ({ page }) => {
  await page.goto("http://localhost:3000/login")

  // Click input[type="email"]
  await page.click('input[type="email"]')

  // Fill input[type="email"]
  await page.fill('input[type="email"]', "hi@chrsep.dev")

  // Click input[type="password"]
  await page.click('input[type="password"]')

  // Fill input[type="password"]
  await page.fill('input[type="password"]', "password")

  // Click text=Masuk
  await page.click("text=Masuk")

  expect(page.url()).toBe("http://localhost:3000/")
})

it("signup", async ({ page }) => {
  await page.goto("http://localhost:3000/signup")

  // Click input[type="email"]
  await page.click('input[type="email"]')

  // Fill input[type="email"]
  await page.fill('input[type="email"]', "hi@chrsep.dev")

  // Click input[type="password"]
  await page.click('input[type="password"]')

  // Fill input[type="password"]
  await page.fill('input[type="password"]', "password")

  // Click input[type="text"]
  await page.click('input[type="text"]')

  // Fill input[type="text"]
  await page.fill('input[type="text"]', "Chris")

  // Click text=Masuk
  await page.click("text=Daftar")

  expect(page.url()).toBe("http://localhost:3000/")
})
