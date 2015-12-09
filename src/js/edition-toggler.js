const switchHandler = ev => {
    ev.target.classList.toggle('edition-toggler__switcher-open');
};

const init = () => {
    document.querySelector('.edition-toggler__switcher')
        .addEventListener('click', switchHandler);
};

export default {
    init
}
