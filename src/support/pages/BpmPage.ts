import { Page, expect } from '@playwright/test';
import BpmElements from '../elements/BpmElements';
import BasePage from './BasePage';

export default class BpmPage extends BasePage {
  readonly bpmElements: BpmElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.bpmElements = new BpmElements(page);
  }

  async acceptCookies(): Promise<void> {
    const acceptButton = this.bpmElements.getAcceptCookiesButton();
    if (await acceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptButton.click();
    }
  }

  async validarListaDeVagas(): Promise<void> {
    await expect(this.bpmElements.getVagasHeading()).toBeVisible();
    await expect(this.bpmElements.getVagaItem()).toBeVisible();
  }

  async validarFormularioDeContato(): Promise<void> {
    await expect(this.bpmElements.getContatoHeading()).toBeVisible();
    await expect(this.bpmElements.getNomeField()).toBeVisible();
    await expect(this.bpmElements.getTelefoneField()).toBeVisible();
    await expect(this.bpmElements.getEmailField()).toBeVisible();
    await expect(this.bpmElements.getAssuntoField()).toBeVisible();
    await expect(this.bpmElements.getMensagemField()).toBeVisible();
    await expect(this.bpmElements.getEnviarButton()).toBeVisible();
  }

  async enviarFormularioVazio(): Promise<void> {
    await this.bpmElements.getEnviarButton().click();
  }

  async validarNomeInvalido(): Promise<boolean> {
    return this.bpmElements
      .getNomeField()
      .evaluate((input: HTMLInputElement) => input.checkValidity());
  }

  async validarLinkFaleConosco(): Promise<void> {
    await expect(this.bpmElements.getFaleConoscoLink()).toHaveAttribute(
      'href',
      /wa\.me\/554899871840/
    );
  }
}
