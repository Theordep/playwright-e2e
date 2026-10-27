import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('BPM Pré-moldados E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.bpm')
    .retrieveData();

  test('deve carregar a home page com o título correto', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/BPM/i);
  });

  test('deve navegar para "Sobre nós" e carregar o título correto', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}sobre-nos`);
    await expect(page).toHaveTitle(/Sobre nós/i);
  });

  test('deve navegar para "Soluções" e carregar o título correto', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}solucoes`);
    await expect(page).toHaveTitle(/Soluções/i);
  });

  test('deve navegar para "Portfólio" e carregar o título correto', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}portfolio`);
    await expect(page).toHaveTitle(/Portfólio/i);
  });
});
