import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';

test.describe('BPM Pré-moldados E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.bpm')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('deve carregar a home page com o título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/BPM/i);
  });

  test('deve clicar em "Ver Portfólio" e ser direcionado para a página de Portfólio', async ({
    page
  }) => {
    await page.getByRole('link', { name: 'Ver Portfólio' }).click();

    await expect(page).toHaveURL(`${BASE_URL}portfolio`);
    await expect(page).toHaveTitle(/Portfólio/i);
  });

  test('deve clicar em "Conheça mais" e ser direcionado para a página Sobre nós', async ({
    page
  }) => {
    await page.getByRole('link', { name: 'Conheça mais' }).click();

    await expect(page).toHaveURL(`${BASE_URL}sobre-nos`);
    await expect(page).toHaveTitle(/Sobre nós/i);
  });

  test('deve clicar em "Ver destaques" e ser direcionado para a página de Destaques', async ({
    page
  }) => {
    await page.getByRole('link', { name: 'Ver destaques' }).click();

    await expect(page).toHaveURL(`${BASE_URL}destaques`);
    await expect(page).toHaveTitle(/Destaques/i);
  });
});
