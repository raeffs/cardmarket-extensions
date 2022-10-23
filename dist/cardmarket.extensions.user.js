
// ==UserScript==
// @name         Cardmarket Extensions
// @version      1.1
// @match        https://www.cardmarket.com/*
// @downloadURL  https://raw.githubusercontent.com/raeffs/cardmarket-extensions/main/dist/cardmarket.extensions.user.js
// @updateURL    https://raw.githubusercontent.com/raeffs/cardmarket-extensions/main/dist/cardmarket.extensions.user.js
// @grant        none
// ==/UserScript==
    
(() => {
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };

  // src/helper/get-child-by-class.function.ts
  function getChildByClass(parent, className) {
    return parent.getElementsByClassName(className)[0];
  }

  // src/helper/get-child-by-tag.function.ts
  function getChildByTag(parent, className) {
    return parent.getElementsByTagName(className)[0];
  }

  // src/helper/get-children-by-class.function.ts
  function getChildrenByClass(parent, className) {
    return parent.getElementsByClassName(className);
  }

  // src/helper/remove-query-from-link.function.ts
  function removeQueryFromLink(link) {
    return link.split("?")[0];
  }

  // src/models/conditions.ts
  function parseCondition(condition) {
    switch (condition) {
      case "MT":
        return 1 /* Mint */;
      case "NM":
        return 2 /* NearMint */;
      case "EX":
        return 3 /* Excellent */;
      case "GD":
        return 4 /* Good */;
      case "LP":
        return 5 /* LightPlayed */;
      case "PL":
        return 6 /* Played */;
      default:
        return 7 /* Poor */;
    }
  }

  // src/models/languages.ts
  function parseLanguage(language) {
    switch (language) {
      case "English":
        return 1 /* English */;
      case "French":
        return 2 /* French */;
      case "German":
        return 3 /* German */;
      case "Spanish":
        return 4 /* Spanish */;
      case "Italian":
        return 5 /* Italian */;
      case "S-Chinese":
        return 6 /* SimplifiedChinese */;
      case "Japanese":
        return 7 /* Japanese */;
      case "Portuguese":
        return 8 /* Portuguese */;
      case "Russian":
        return 9 /* Russian */;
      case "Korean":
        return 10 /* Korean */;
      case "T-Chinese":
        return 11 /* TraditionalChinese */;
      case "Dutch":
        return 12 /* Dutch */;
      case "Polish":
        return 13 /* Polish */;
      case "Czech":
        return 14 /* Czech */;
      case "Hungarian":
        return 15 /* Hungarian */;
      default:
        return 0 /* All */;
    }
  }

  // src/models/request-params.ts
  var _params;
  var _RequestParams = class {
    constructor() {
      __privateAdd(this, _params, {});
    }
    setCountry(country) {
      __privateGet(this, _params)[_RequestParams.CountryParamName] = country;
      return this;
    }
    setLanguage(language) {
      __privateGet(this, _params)[_RequestParams.LanguageParamName] = language;
      return this;
    }
    setCondition(condition) {
      __privateGet(this, _params)[_RequestParams.ConditionParamName] = condition;
      return this;
    }
    setFoil(foil) {
      __privateGet(this, _params)[_RequestParams.FoilParamName] = foil;
      return this;
    }
    asString() {
      return Object.keys(__privateGet(this, _params)).map((key) => `${key}=${__privateGet(this, _params)[key]}`).join("&");
    }
  };
  var RequestParams = _RequestParams;
  _params = new WeakMap();
  RequestParams.CountryParamName = "sellerCountry";
  RequestParams.LanguageParamName = "language";
  RequestParams.ConditionParamName = "minCondition";
  RequestParams.FoilParamName = "isFoil";

  // src/page-decorators/decorate-offers-singles.function.ts
  function decorateOffersSingles() {
    for (const offer of getChildrenByClass(document, "article-row")) {
      const productName = getChildByClass(offer, "col-seller");
      const productAttributes = getChildByClass(offer, "product-attributes");
      const condition = parseCondition(getChildByClass(productAttributes, "article-condition").textContent);
      const language = parseLanguage(
        getChildrenByClass(productAttributes, "icon mr-2")[1].getAttribute("data-original-title")
      );
      let isFoil = false;
      for (const element of getChildrenByClass(productAttributes, "icon mr-1")) {
        if (element.getAttribute("data-original-title") == "Foil") {
          isFoil = true;
          break;
        }
      }
      let requestParams = new RequestParams().setCountry(4 /* Switzerland */).setLanguage(language).setCondition(condition);
      if (isFoil) {
        requestParams = requestParams.setFoil("Y" /* Yes */);
      }
      const productLink = getChildByTag(productName, "a");
      productLink.href = `${removeQueryFromLink(productLink.href)}?${requestParams.asString()}`;
    }
  }

  // src/helper/get-childred-by-tag.function.ts
  function getChildrenByTag(parent, className) {
    return parent.getElementsByTagName(className);
  }

  // src/page-decorators/decorate-singles.function.ts
  function decorateSingles() {
    const infoList = getChildByClass(document, "info-list-container");
    for (const link of getChildrenByTag(infoList, "a")) {
      const currentQuery = window.location.href.split("?")[1] || "";
      link.href = `${removeQueryFromLink(link.href)}?${currentQuery}`;
    }
  }

  // src/index.ts
  var match = window.location.href.match(/\/\/www\.cardmarket\.com\/(?<lang>\w+)\//);
  if (match && match.groups && match.groups["lang"] != "en") {
    window.location.href = window.location.href.replace(
      `//www.cardmarket.com/${match.groups["lang"]}/`,
      "//www.cardmarket.com/en/"
    );
  }
  if (window.location.pathname.match(/\/Magic\/Users\/\S*\/Offers\/Singles/)) {
    decorateOffersSingles();
  }
  if (window.location.pathname.match(/\/Magic\/Products\/Singles/)) {
    decorateSingles();
  }
})();
