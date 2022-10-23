import { Conditions } from './conditions';
import { Countries } from './countries';
import { Flags } from './flags';
import { Languages } from './languages';

export class RequestParams {
  public static readonly CountryParamName = 'sellerCountry';
  public static readonly LanguageParamName = 'language';
  public static readonly ConditionParamName = 'minCondition';
  public static readonly FoilParamName = 'isFoil';

  readonly #params = {};

  public setCountry(country: Countries): RequestParams {
    this.#params[RequestParams.CountryParamName] = country;
    return this;
  }

  public setLanguage(language: Languages): RequestParams {
    this.#params[RequestParams.LanguageParamName] = language;
    return this;
  }

  public setCondition(condition: Conditions): RequestParams {
    this.#params[RequestParams.ConditionParamName] = condition;
    return this;
  }

  public setFoil(foil: Flags): RequestParams {
    this.#params[RequestParams.FoilParamName] = foil;
    return this;
  }

  public asString(): string {
    return Object.keys(this.#params)
      .map(key => `${key}=${this.#params[key]}`)
      .join('&');
  }
}
