const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  // convert to url object
  const currentURLObj = new URL(currentURL)
  const baseURLObj = new URL(baseURL)

  // check if it is external domain and break
  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages
  }

  // convert to normalized url
  const normalizedURL = normalizeUrl(currentURL)

  // if normalized url exists, increase count by 1
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }

  if (currentURL === baseURL) {
    pages[normalizedURL] = 0
  } else {
    pages[normalizedURL] = 1
  }

  console.log(`Crawling ${currentURL}`)
  
  let htmlBody = ""
  try {                                                         // try below
    const response = await fetch(currentURL)                    // fetch current url
    if (response.status > 399) {                                // check for failing status code and return
      console.log(`Got HTTP error, status code: ${response.status}`)
      return pages
    }
    const contentType = response.headers.get('content-type')    // get and check the content type
    if (!contentType.includes('text/html')){                    // if it is not html, return non-html error
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    bodyText = await response.text()                            // set bodytext to body text of repsonse
  } catch (err) {
    console.log(`${err.message}`)                               // print error if any of this fails
  }

  const nextURLs = getURLsFromHTML(bodyText, baseURL) 
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []                                               // Create url storage list
  const dom = new JSDOM(htmlBody)                               // Create jsdom html object
  const aElements = dom.window.document.querySelectorAll('a')   // create list of <a> elements
  for (const aElement of aElements) {                           // Loop through each element
    if (aElement.href[0] === "/") {                             // if this is relative url
      try {
        urls.push(new URL(aElement.href, baseURL).href)         // try converting baseURL + relative URL to url object
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`)         // if this fails, it is invalid and return error
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)                  // try converting url to url object
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`)         // if this fails, it is invalid and return error
      }
    }
  }
  return urls                                                   // return list of urls
}

function normalizeUrl(url) {
  const urlObj = new URL(url)                                   // create url object, append hostname with pathname, removing trailing / from path
  return urlObj.hostname + "" + (urlObj.pathname.endsWith('/') ? urlObj.pathname.slice(0, -1) : urlObj.pathname)
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage
}