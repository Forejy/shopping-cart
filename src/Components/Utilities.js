export const categoriesLinkNames = ["blush", "bronzer", "eyebrow", "eyeliner", "eyeshadow", "foundation", "lip_liner", "lipstick", "mascara", "nail_polish"]

export const categoriesNames = ["Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation", "Lip Liner", "Lipstick", "Mascara", "Nail Polish"]

export function showLoading(nbr = 1) {
  let ret = [];
  for(let k = 1; k <= nbr; k++) {
    ret.push(<div className="Deck__loading">LOADING</div>)
  }
  return ret;
}

export function showError(error) {
  return (
    <div>Error happened : { error.message }</div>
  )
}