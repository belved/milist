function toUpperCase(str) {
    return str.split(' ').map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
}

export default toUpperCase;