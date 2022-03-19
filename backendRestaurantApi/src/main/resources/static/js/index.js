window.addEventListener("DOMContentLoaded",function() {
    const collapseList = Array.from(document.getElementsByClassName('collapse'));
    const collapseButtons = Array.from(document.getElementsByClassName('collapse-button'));

    function toggleArrow(e){
        const arrow = e.target.previousSibling.previousSibling.children[1].children[0];
        arrow.classList.toggle("down");
    }
    collapseList.forEach(el => {
        el.addEventListener("show.bs.collapse",toggleArrow);
        el.addEventListener("hide.bs.collapse",toggleArrow);
    });
})