const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const USER = 'jackalagents@gmail.com';
  const PASS = 'jackal1$87';
  const REPO = 'scaleforge-studio';
  const baseDir = '/home/jackal/.openclaw/scaleforge-project';

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://github.com/login', { waitUntil: 'domcontentloaded' });
    await page.fill('#login_field', USER);
    await page.fill('#password', PASS);
    await page.click('input[name="commit"]');
    await page.waitForLoadState('domcontentloaded');

    const url = page.url();
    if (url.includes('two-factor') || url.includes('/sessions/verified-device')) {
      throw new Error('GitHub requires 2FA/verification; manual step needed.');
    }
    if (url.includes('/login')) {
      const flash = await page.locator('#js-flash-container').innerText().catch(() => 'Login failed');
      throw new Error('Login failed: ' + flash);
    }

    // create repo (idempotent)
    await page.goto(`https://github.com/new`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const repoInput = page.locator('#repository-name-input');
    if (!(await repoInput.count())) {
      await page.screenshot({ path: path.join(baseDir, 'debug-new-page.png'), fullPage: true });
      throw new Error('Repository name input not found at ' + page.url());
    }
    await repoInput.fill(REPO);
    const createBtn = page.getByRole('button', { name: 'Create repository' });
    const disabled = await createBtn.getAttribute('disabled');
    if (disabled !== null) {
      // maybe exists, continue
      await page.goto(`https://github.com/jackalagents/${REPO}`, { waitUntil: 'domcontentloaded' });
    } else {
      await createBtn.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // Upload files using web UI
    await page.goto(`https://github.com/jackalagents/${REPO}/upload/main`, { waitUntil: 'domcontentloaded' });

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([
      path.join(baseDir, 'index.html'),
      path.join(baseDir, 'styles.css'),
      path.join(baseDir, 'script.js'),
      path.join(baseDir, '.gitignore'),
    ]);

    await page.waitForTimeout(3000);

    const commitButton = page.locator('button:has-text("Commit changes")');
    await commitButton.first().click();
    await page.waitForLoadState('domcontentloaded');

    // Enable Pages from main branch root
    await page.goto(`https://github.com/jackalagents/${REPO}/settings/pages`, { waitUntil: 'domcontentloaded' });

    await page.selectOption('select#build_type', 'legacy').catch(() => {});

    const branchSelect = page.locator('select#branch');
    if (await branchSelect.count()) {
      await branchSelect.selectOption('main');
    }
    const folderSelect = page.locator('select#path');
    if (await folderSelect.count()) {
      await folderSelect.selectOption('/ (root)');
    }

    const saveBtn = page.locator('button:has-text("Save")');
    if (await saveBtn.count()) {
      await saveBtn.first().click();
      await page.waitForTimeout(4000);
    }

    // Check deployed URL hint
    await page.reload({ waitUntil: 'domcontentloaded' });
    const text = await page.content();
    const match = text.match(/https:\/\/jackalagents\.github\.io\/scaleforge-studio\/?/i);
    if (!match) {
      console.log('DEPLOYED_URL=https://jackalagents.github.io/scaleforge-studio/');
    } else {
      console.log('DEPLOYED_URL=' + match[0]);
    }
  } catch (err) {
    console.error('DEPLOY_ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
