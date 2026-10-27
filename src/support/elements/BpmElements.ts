import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class BpmElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getAcceptCookiesButton(): Locator {
    return this.page.getByRole('link', { name: 'Aceitar todos os cookies' });
  }

  getFaleConoscoLink(): Locator {
    return this.page.getByRole('link', { name: 'FALE CONOSCO' });
  }

  getVagasHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Vagas', level: 1 });
  }

  getVagaItem(): Locator {
    return this.page.locator('a[href^="/vaga/"]').first();
  }

  getContatoHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Fale conosco' });
  }

  getNomeField(): Locator {
    return this.page.getByPlaceholder('NOME COMPLETO');
  }

  getTelefoneField(): Locator {
    return this.page.getByPlaceholder('Telefone COM DDD');
  }

  getEmailField(): Locator {
    return this.page.getByPlaceholder('Seu melhor e-mail');
  }

  getAssuntoField(): Locator {
    return this.page.getByPlaceholder('Assunto');
  }

  getMensagemField(): Locator {
    return this.page.getByPlaceholder('Mensagem');
  }

  getTermosCheckbox(): Locator {
    return this.page.getByRole('checkbox');
  }

  getEnviarButton(): Locator {
    return this.page.getByRole('button', { name: 'Enviar' });
  }
}
