const initAvatar = (fullName: string) => {
    let initAvatar = fullName.split(" ").map(word => word[0]).join("").toLocaleUpperCase();
    return `http://ui-avatars.com/api/?name=${initAvatar}&background=random&size=100`;
}

export {
    initAvatar,
}