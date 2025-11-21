export function shortAddress(addr: string, chars = 4) {
  if (!addr) return "";
  return `${addr.slice(0, 2 + chars)}...${addr.slice(-chars)}`;
}
