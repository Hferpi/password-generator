export const generateRandomUsername = (length= 8) => {
    const adjectives = ["fast", "smart", "cool", "brave", "bright", "calm", "eager", "fancy", "gentle", "happy"];
    const nouns = ["lion", "tiger", "bear", "eagle", "shark", "wolf", "fox", "panda", "zebra", "giraffe"];
    const randomItem = (array: any) => array[Math.floor(Math.random() * array.length)];

    let username = ""
    username += randomItem(adjectives);
    username += randomItem(nouns);
    username += Math.floor(Math.random() * 10000)

    if (username.length > length) {
        username = username.substring(0, length);
    }
    return username;
}