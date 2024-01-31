module.exports = {
  get_stars: (rating) => {
    const roundedRating = Math.round(rating);

    if (roundedRating === 1) {
      return `<input id='one-star' type="checkbox" name="rating-3" class="mask mask-heart bg-red-400 cursor-pointer" disabled checked/>
      <input id='two-star' type="checkbox" name="rating-3" class="mask mask-heart bg-orange-400 cursor-pointer" disabled/>
      <input id='three-star' type="checkbox" name="rating-3" class="mask mask-heart bg-yellow-400 cursor-pointer" disabled/>
      <input id='four-star' type="checkbox" name="rating-3" class="mask mask-heart bg-lime-400 cursor-pointer" disabled/>
      <input id='five-star' type="checkbox" name="rating-3" class="mask mask-heart bg-green-400 cursor-pointer" disabled/>`;
    } else if (roundedRating === 2) {
      return `<input id='one-star' type="checkbox" name="rating-3" class="mask mask-heart bg-red-400 cursor-default" disabled/>
      <input id='two-star' type="checkbox" name="rating-3" class="mask mask-heart bg-orange-400 cursor-default" disabled checked/>
      <input id='three-star' type="checkbox" name="rating-3" class="mask mask-heart bg-yellow-400 cursor-default" disabled/>
      <input id='four-star' type="checkbox" name="rating-3" class="mask mask-heart bg-lime-400 cursor-default" disabled/>
      <input id='five-star' type="checkbox" name="rating-3" class="mask mask-heart bg-green-400 cursor-default" disabled/>`;
    } else if (roundedRating === 3) {
      return `<input id='one-star' type="checkbox" name="rating-3" class="mask mask-heart bg-red-400 cursor-default" disabled/>
      <input id='two-star' type="checkbox" name="rating-3" class="mask mask-heart bg-orange-400 cursor-default" disabled/>
      <input id='three-star' type="checkbox" name="rating-3" class="mask mask-heart bg-yellow-400 cursor-default" disabled checked/>
      <input id='four-star' type="checkbox" name="rating-3" class="mask mask-heart bg-lime-400 cursor-default" disabled/>
      <input id='five-star' type="checkbox" name="rating-3" class="mask mask-heart bg-green-400 cursor-default" disabled/>`;
    } else if (roundedRating === 4) {
      return `<input id="one-star" type="checkbox" name="rating-3" class="mask mask-heart bg-red-400 cursor-default" disabled/>
      <input id="two-star" type="checkbox" name="rating-3" class="mask mask-heart bg-orange-400 cursor-default" disabled/>
      <input id="three-star" type="checkbox" name="rating-3" class="mask mask-heart bg-yellow-400 cursor-default" disabled/>
      <input id="four-star" type="checkbox" name="rating-3" class="mask mask-heart bg-lime-400 cursor-default" disabled checked/>
      <input id="five-star" type="checkbox" name="rating-3" class="mask mask-heart bg-green-400 cursor-default" disabled/>`;
    } else if (roundedRating === 5) {
      return `<input id='one-star' type="checkbox" name="rating-3" class="mask mask-heart bg-red-400 cursor-default" disabled/>
      <input id='two-star' type="checkbox" name="rating-3" class="mask mask-heart bg-orange-400 cursor-default" disabled/>
      <input id='three-star' type="checkbox" name="rating-3" class="mask mask-heart bg-yellow-400 cursor-default" disabled/>
      <input id='four-star' type="checkbox" name="rating-3" class="mask mask-heart bg-lime-400 cursor-default" disabled/>
      <input id='five-star' type="checkbox" name="rating-3" class="mask mask-heart bg-green-400 cursor-default" disabled checked/>`;
    }
  },
};

