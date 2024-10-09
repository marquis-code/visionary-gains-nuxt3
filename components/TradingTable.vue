<template>
  <div class="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 bg-black">
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs">
        <thead class="rounded-t-lg bg-black">
          <tr class="text-center">
            <th title="Ranking" class="p-3 text-center border border-white" />
            <th title="Team name" class="p-3 text-center border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/GB.svg" alt="Eur Logo">EUR</span>
              </div>
            </th>
            <th title="Wins" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/US.svg" alt="USD Logo">USD</span>
              </div>
            </th>
            <th title="Losses" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/JP.svg" alt=""> JPY</span>
              </div>
            </th>
            <th title="Win percentage" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/GB.svg" alt="">GBP</span>
              </div>
            </th>
            <th title="Games behind" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/CH.svg" alt="CHF LOGO"> CHF</span>
              </div>
            </th>
            <th title="Home games" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/AU.svg" alt="AUD LOGO">AUD</span>
              </div>
            </th>
            <th title="Away games" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/CA.svg" alt="">CAD</span>
              </div>
            </th>
            <th title="Last 10 games" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/NZ.svg" alt="NZD">NZD</span>
              </div>
            </th>
            <th title="Current streak" class="p-3 border border-white">
              <div class="flex justify-center items-center">
                <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/CN.svg" alt="CNY LOGO">CNY</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="sticky text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/GB.svg" alt="Eur Logo">EUR</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/US.svg" alt="USD Logo">USD</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/JP.svg" alt=""> JPY</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img src="https://s3-symbol-logo.tradingview.com/country/GB.svg" class="rounded-full" alt="">GBP</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img class="rounded-full" src="https://s3-symbol-logo.tradingview.com/country/CH.svg" alt="CHF LOGO"> CHF</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img src="https://s3-symbol-logo.tradingview.com/country/AU.svg" class="rounded-full" alt="AUD LOGO">AUD</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 border border-white text-center">
              <span class="flex items-center gap-x-2"><img src="https://s3-symbol-logo.tradingview.com/country/CA.svg" class="rounded-full" alt="">CAD</span>
            </td>
            <td class="px-3 py-2 border border-white text-center">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 text-center border border-white">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 text-center border border-white">
              <span class="flex items-center gap-x-2"><img src="https://s3-symbol-logo.tradingview.com/country/NZ.svg" class="rounded-full" alt="NZD">NZD</span>
            </td>
            <td class="px-3 py-2 border border-white text-center">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 border border-white text-center">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white">
              <span>2%</span>
            </td>
          </tr>
          <tr class="text-center border border-white bg-black">
            <td class="px-3 py-2 border border-white  text-center">
              <span class="flex items-center gap-x-2"><img src="https://s3-symbol-logo.tradingview.com/country/CN.svg" class="rounded-full" alt="CNY LOGO">CNY</span>
            </td>
            <td class="px-3 py-2  border border-white text-center">
              <span>0.5%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>31%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>17%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>646%</span>
            </td>
            <td class="px-3 py-2 border border-white  text-center">
              <span>0%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>5%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>12%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>2%</span>
            </td>
            <td class="px-3 py-2 border border-white ">
              <span>2%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table, th, td {
  border
: 1px solid black;
  border-collapse: collapse;
}
</style>
