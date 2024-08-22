export const adminWikitekaColors: Record<number, string> = {
  1: '#567459',
  2: '#745656',
  3: '#565E74',
  4: '#896795',
  5: '#956F53',
  6: '#727272',
  7: '#6F578D',
  8: '#865077',
  9: '#648385',
  10: '#64704B'
}

export const getAdminWikitekaColor = (id: number) => {
  const str = String(id)

  if (str.length > 1) {
    return adminWikitekaColors[parseInt(str[1])]
  }

  return adminWikitekaColors[id]
}
