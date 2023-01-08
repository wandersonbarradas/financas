export const activeSidebarItem = (classActive: string, item: string) => {
    document.querySelector(`.${classActive}`)?.classList.remove(classActive);
    if (item === "moreOptions") {
        document
            .querySelector(`.${item}`)
            ?.querySelector(".link-item")
            ?.classList.add(classActive);
    } else {
        document.querySelector(`.${item} a`)?.classList.add(classActive);
    }
};
