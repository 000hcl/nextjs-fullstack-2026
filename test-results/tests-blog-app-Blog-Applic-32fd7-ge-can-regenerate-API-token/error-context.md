# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/blog-app.spec.ts >> Blog Application >> Me Page >> can regenerate API token
- Location: tests/blog-app.spec.ts:451:9

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "26f91d42-26b7-425e-a791-b6ff06b4bdb8"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - link "home" [ref=e3] [cursor=pointer]:
      - /url: /
    - link "blogs" [ref=e4] [cursor=pointer]:
      - /url: /blogs
    - link "users" [ref=e5] [cursor=pointer]:
      - /url: /users
    - link "new blog" [ref=e6] [cursor=pointer]:
      - /url: /blogs/new
    - link "me" [ref=e7] [cursor=pointer]:
      - /url: /me
    - emphasis [ref=e8]: Test User logged in
    - button "logout" [ref=e9]
  - button "Open Next.js Dev Tools" [ref=e15] [cursor=pointer]:
    - generic [ref=e18]:
      - text: Rendering
      - generic [ref=e19]:
        - generic [ref=e20]: .
        - generic [ref=e21]: .
        - generic [ref=e22]: .
  - alert [ref=e23]
  - generic [ref=e24]:
    - heading "My profile" [level=2] [ref=e25]
    - text: "Name:"
    - generic [ref=e26]: Test User
    - text: "Username:"
    - generic [ref=e27]: testuser
    - generic [ref=e28]:
      - heading "API token" [level=3] [ref=e29]
      - generic [ref=e31]: 26f91d42-26b7-425e-a791-b6ff06b4bdb8
      - button "Generate new API token" [active] [ref=e33]
    - heading "Reading List" [level=2] [ref=e34]
    - generic [ref=e35]:
      - heading "Unread (0)" [level=3] [ref=e36]
      - list [ref=e37]:
        - generic [ref=e38]: Your reading list is empty
    - generic [ref=e39]:
      - heading "Read (0)" [level=3] [ref=e40]
      - list
```

# Test source

```ts
  368 |       await page.getByRole("link", { name: "Test Blog" }).click()
  369 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  370 |       await page.getByTestId("add-to-reading-list-button").click()
  371 | 
  372 |       // Wait for server action to complete
  373 |       await page.waitForTimeout(500)
  374 | 
  375 |       // Go to me page and mark as read
  376 |       await page.goto("/me")
  377 |       await page.waitForSelector('[data-testid^="mark-read-"]', {
  378 |         timeout: 10000,
  379 |       })
  380 | 
  381 |       // Click the first mark as read button
  382 |       const markReadButton = page.locator('[data-testid^="mark-read-"]').first()
  383 |       await markReadButton.click()
  384 | 
  385 |       // Wait for the page to update
  386 |       await page.waitForTimeout(1000)
  387 | 
  388 |       // Should now show empty unread section
  389 |       await expect(page.getByTestId("no-unread-blogs")).toBeVisible()
  390 |     })
  391 | 
  392 |     test("shows multiple blogs in reading list", async ({ page }) => {
  393 |       // Create another user to own blogs
  394 |       await createUser("blogowner", "Blog Owner", "password123")
  395 |       await loginUser(page, "blogowner", "password123")
  396 |       await createBlog(page, "First Blog", "Author One", "http://first.com")
  397 |       await createBlog(page, "Second Blog", "Author Two", "http://second.com")
  398 | 
  399 |       // Login as testuser and add both blogs to reading list
  400 |       await loginUser(page, "testuser", "testpass123")
  401 | 
  402 |       await page.goto("/blogs")
  403 |       await page.getByRole("link", { name: "First Blog" }).click()
  404 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  405 |       await Promise.all([
  406 |         page.waitForResponse((response) => response.status() === 200),
  407 |         page.getByTestId("add-to-reading-list-button").click(),
  408 |       ])
  409 | 
  410 |       await page.goto("/blogs")
  411 |       await page.getByRole("link", { name: "Second Blog" }).click()
  412 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  413 |       await Promise.all([
  414 |         page.waitForResponse((response) => response.status() === 200),
  415 |         page.getByTestId("add-to-reading-list-button").click(),
  416 |       ])
  417 | 
  418 |       // Go to me page
  419 |       await page.goto("/me")
  420 | 
  421 |       // Should show both blogs in unread section
  422 |       const unreadSection = page.getByTestId("unread-section")
  423 |       await expect(unreadSection).toContainText("First Blog")
  424 |       await expect(unreadSection).toContainText("Second Blog")
  425 |     })
  426 | 
  427 |     test("shows API token section", async ({ page }) => {
  428 |       await loginUser(page, "testuser", "testpass123")
  429 |       await page.goto("/me")
  430 | 
  431 |       await expect(page.getByTestId("api-token-section")).toBeVisible()
  432 |       await expect(page.getByTestId("no-token-message")).toBeVisible()
  433 |       await expect(page.getByTestId("generate-token-button")).toBeVisible()
  434 |     })
  435 | 
  436 |     test("can generate API token", async ({ page }) => {
  437 |       await loginUser(page, "testuser", "testpass123")
  438 |       await page.goto("/me")
  439 | 
  440 |       // Generate token
  441 |       await page.getByTestId("generate-token-button").click()
  442 | 
  443 |       // Should show the generated token
  444 |       await expect(page.getByTestId("token-display")).toBeVisible()
  445 |       // Token should be visible in a code element
  446 |       const token = await page.getByTestId("api-token").textContent()
  447 |       expect(token).toBeTruthy()
  448 |       expect(token!.length).toBeGreaterThan(10)
  449 |     })
  450 | 
  451 |     test("can regenerate API token", async ({ page }) => {
  452 |       await loginUser(page, "testuser", "testpass123")
  453 |       await page.goto("/me")
  454 | 
  455 |       // Generate first token
  456 |       await page.getByTestId("generate-token-button").click()
  457 |       await page.waitForSelector('[data-testid="api-token"]')
  458 |       const firstToken = await page.getByTestId("api-token").textContent()
  459 | 
  460 |       // Generate new token without reloading
  461 |       await page.getByTestId("generate-token-button").click()
  462 | 
  463 |       // Wait for token to potentially change
  464 |       await page.waitForTimeout(500)
  465 |       const secondToken = await page.getByTestId("api-token").textContent()
  466 | 
  467 |       // Tokens should be different
> 468 |       expect(firstToken).not.toBe(secondToken)
      |                              ^ Error: expect(received).not.toBe(expected) // Object.is equality
  469 |       expect(secondToken).toBeTruthy()
  470 |     })
  471 |   })
  472 | })
  473 | 
```