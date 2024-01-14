export const activateBtn = (e: Event) => {
  const currentTarget = <HTMLButtonElement>e.currentTarget;
  const activeToolBtn = document.querySelector('.toolbar__button.active');

  activeToolBtn?.classList.remove('active');
  currentTarget?.classList.add('active');
};
