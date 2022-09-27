export function getMmrColor(mmr: number) {
    return mmr > 0 ? `hsl(${120 * ((1800 - mmr) / 1800) * 4 * -1 + 120}, 100%, 67%)`: "transparent";
}
