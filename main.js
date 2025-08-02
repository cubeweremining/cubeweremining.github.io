async function updateBitcoinPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl,usd,eur,ars,cad,gbp,jpy,cny,chf,aud,rub,inr,mxn,zar');
    const data = await response.json();

    const prices = {
      "🇧🇷 BRL": data.bitcoin.brl,
      "🇺🇸 USD": data.bitcoin.usd,
      "🇪🇺 EUR": data.bitcoin.eur,
      "🇦🇷 ARS": data.bitcoin.ars,
      "🇨🇦 CAD": data.bitcoin.cad,
      "🇬🇧 GBP": data.bitcoin.gbp,
      "🇯🇵 JPY": data.bitcoin.jpy,
      "🇨🇳 CNY": data.bitcoin.cny,
      "🇨🇭 CHF": data.bitcoin.chf,
      "🇦🇺 AUD": data.bitcoin.aud,
      "🇷🇺 RUB": data.bitcoin.rub,
      "🇮🇳 INR": data.bitcoin.inr,
      "🇲🇽 MXN": data.bitcoin.mxn,
      "🇿🇦 ZAR": data.bitcoin.zar
    };

    let html = `<strong>Bitcoin price</strong><br>`;
    for (const [label, value] of Object.entries(prices)) {
      const locale = label.includes('BRL') ? 'pt-BR'
                   : label.includes('USD') ? 'en-US'
                   : label.includes('EUR') ? 'de-DE'
                   : label.includes('ARS') ? 'es-AR'
                   : label.includes('CAD') ? 'en-CA'
                   : label.includes('GBP') ? 'en-GB'
                   : label.includes('JPY') ? 'ja-JP'
                   : label.includes('CNY') ? 'zh-CN'
                   : label.includes('CHF') ? 'de-CH'
                   : label.includes('AUD') ? 'en-AU'
                   : label.includes('RUB') ? 'ru-RU'
                   : label.includes('INR') ? 'en-IN'
                   : label.includes('MXN') ? 'es-MX'
                   : label.includes('ZAR') ? 'en-ZA'
                   : 'en-US';

      const currency = label.split(" ")[1];
      const formatted = value.toLocaleString(locale, { style: 'currency', currency });
      html += `${label}: ${formatted}<br>`;
    }

    document.getElementById('bitcoin-bar').innerHTML = html;

  } catch (error) {
    document.getElementById('bitcoin-bar').style.display = "none";
    console.error(error);
  }
}

function isVisible() {
  const icon = document.getElementById('icon');
  icon.setAttribute("href", document.visibilityState === "visible" ? "favicon.png" : "favicon2.png");
}

isVisible();
updateBitcoinPrice();
setInterval(updateBitcoinPrice, 60000);
document.addEventListener("visibilitychange", isVisible);
