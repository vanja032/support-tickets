const sha256 = async (data: string) => {
    const utf8 = new TextEncoder().encode(data);
    const hash = await crypto.subtle.digest("SHA-256", utf8);
    return Array.from(new Uint8Array(hash)).map((bytes) => {
        return bytes.toString(16).padStart(2, "0")
    }).join("");
};

const algoHash = async (data: string) => {
    const t_value: string = (new Date()).getTime().toString();
    const dataHash = await sha256(data);
    const tHash = await sha256(t_value);
    const hash = await sha256(`${dataHash}${tHash}`);

    const tHashBin = parseInt(tHash, 16).toString(2);
    const hashBin = parseInt(hash, 16).toString(2);
    
    const sumHash = await sha256(`${tHashBin}${hashBin}`);

    return `${hash}${tHash}${sumHash}`;
};


export const Hash = {
    sha256,
    algoHash
};