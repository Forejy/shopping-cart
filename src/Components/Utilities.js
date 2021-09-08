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