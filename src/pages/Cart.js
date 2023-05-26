export default function Cart({ $target }) {
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = `
      <main>여기는 장바구니 페이지</main>
    `;
  };

  this.render();
}
