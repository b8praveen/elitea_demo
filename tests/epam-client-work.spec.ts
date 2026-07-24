import { test, expect } from '@playwright/test';

test('EPAM client work page is reachable from Services menu', async ({ page }) => {
  await page.goto('https://www.epam.com');

  const acceptAll = page.getByRole('button', { name: 'Accept All' });
  if (await acceptAll.isVisible().catch(() => false)) {
    await acceptAll.click();
  }

  const servicesMenu = page.locator('[aria-label="Services"]').first();
  await servicesMenu.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' }));
  await servicesMenu.evaluate((el) => (el as HTMLElement).click());

  const clientWorkLink = page.locator('a[href="/services/client-work"]').first();
  await clientWorkLink.evaluate((el) => (el as HTMLElement).click());

  await expect(page).toHaveURL(/\/services\/client-work$/);
  await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
  await expect(page.getByText('Client Work', { exact: true })).toBeVisible();
});
