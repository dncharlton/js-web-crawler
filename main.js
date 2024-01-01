const { crawlPage } = require('./crawl')
const { printReport } = require('./report')


async function main(){
  if (process.argv.length < 3) {
    console.log('ERROR: No URL provided')
    return 0
  } else if (process.argv.length > 3) {
    console.log('ERROR: Too many arguments provided')
  }

  const baseURL = process.argv[2]

  console.log('==============================')
  console.log('Web Crawler Starting with URL:')
  console.log(baseURL)
  console.log('==============================\n')

  const pages = await crawlPage(baseURL, baseURL, {})
  printReport(pages)
}

main()