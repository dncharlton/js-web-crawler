function printReport(pages) {
  console.log('\n====================================== REPORT STARTING ======================================')
  const sortedPages = sortPages(pages)
  for (const page of sortedPages) {
    console.log(`Page ${page[0]} visited ${page[1]} times.`)
  }

  console.log('====================================== REPORT FINISHED ======================================\n')
}

function sortPages(pages) {
var pagesList = []
  for (var item in pages){
    pagesList.push([item, pages[item]])
  }

  var swap_occurred = true
  while (swap_occurred === true) {
    swap_occurred = false
    for (var i = 1; i < pagesList.length; i++) {
      // console.log('check swap')
      // console.log(pagesList[i-1][1], "<", pagesList[i][1])
      if (pagesList[i-1][1] < pagesList[i][1]) {
        var temp = pagesList[i-1]
        pagesList[i-1] = pagesList[i]
        pagesList[i] = temp
        swap_occurred = true
      }
    }
  }

  return pagesList
}

module.exports = {
  printReport
}