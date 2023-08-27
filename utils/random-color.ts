export function generateColorByText({
  text,
  brightness = 250,
}: {
  text: string;
  brightness?: number;
}): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color[i] = Math.floor(value * (brightness / 255) + (255 - brightness));
  }

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
