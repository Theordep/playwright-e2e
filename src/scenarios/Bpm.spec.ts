import { expect, test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import BpmPage from '../support/pages/BpmPage';

test.describe('BPM Pré-moldados E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let bpmPage: BpmPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.bpm')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    bpmPage = new BpmPage(page);
    await page.goto(BASE_URL);
    await bpmPage.acceptCookies();
  });

  test('deve carregar a home page com o título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/BPM/i);
    await expect(page).toHaveURL(BASE_URL);
  });

  test('deve aceitar os cookies e ocultar o aviso', async () => {
    await expect(
      bpmPage.bpmElements.getAcceptCookiesButton()
    ).not.toBeVisible();
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

  test('deve navegar para "Destaques" e carregar o título correto', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}destaques`);
    await expect(page).toHaveTitle(/Destaques/i);
  });

  test('deve navegar para "Vagas" e exibir a lista de vagas abertas', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}vagas`);
    await bpmPage.validarListaDeVagas();
  });

  test('deve navegar para "Contato" e exibir o formulário completo', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}contato`);
    await bpmPage.validarFormularioDeContato();
  });

  test('não deve enviar o formulário de contato com campos obrigatórios vazios', async ({
    page
  }) => {
    await page.goto(`${BASE_URL}contato`);
    await bpmPage.enviarFormularioVazio();
    const isValid = await bpmPage.validarNomeInvalido();
    expect(isValid).toBeFalsy();
    await expect(page).toHaveURL(`${BASE_URL}contato`);
  });

  test('deve exibir o link "FALE CONOSCO" apontando para o WhatsApp correto', async () => {
    await bpmPage.validarLinkFaleConosco();
  });
});
