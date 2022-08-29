function rand(max, offset = 0, v = 4) {
    //return Math.floor((Math.random() * max) + offset);
    let r = 0;
    for(let i = 0; i < v; i++) {
        r += (Math.random() * max) + offset;
    }

    return Math.floor(r / v);
}