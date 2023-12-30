export const sortByIndexList = (dataList, idList) => {
  const idToIndexMap = {}
  idList.forEach((id, index) => {
    idToIndexMap[id] = index
  })

  return dataList
    .filter((data) => data.id in idToIndexMap)
    .sort((a, b) => idToIndexMap[a.id] - idToIndexMap[b.id])
}
